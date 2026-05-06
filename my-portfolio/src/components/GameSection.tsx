import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './GameSection.module.css'

// ── Types ──────────────────────────────────────────────────────────────────
interface Point { x: number; y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type GameState = 'idle' | 'playing' | 'paused' | 'dead'

// ── Constants ──────────────────────────────────────────────────────────────
const COLS = 20
const ROWS = 20
const TICK_NORMAL = 150
const TICK_FAST = 75

const DIR_MAP: Record<string, Direction> = {
  ArrowUp: 'UP', w: 'UP', W: 'UP',
  ArrowDown: 'DOWN', s: 'DOWN', S: 'DOWN',
  ArrowLeft: 'LEFT', a: 'LEFT', A: 'LEFT',
  ArrowRight: 'RIGHT', d: 'RIGHT', D: 'RIGHT',
}

const OPPOSITE: Record<Direction, Direction> = {
  UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
}

function randPoint(snake: Point[]): Point {
  let p: Point
  do {
    p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === p.x && s.y === p.y))
  return p
}

function initSnake(): Point[] {
  const cx = Math.floor(COLS / 2)
  const cy = Math.floor(ROWS / 2)
  return [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }]
}

// ── Component ──────────────────────────────────────────────────────────────
export default function GameSection() {
  const [visible, setVisible] = useState(false)
  const [gameState, setGameState] = useState<GameState>('idle')
  const [snake, setSnake] = useState<Point[]>(initSnake)
  const [food, setFood] = useState<Point>({ x: 5, y: 5 })
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem('snake_best') ?? 0) } catch { return 0 }
  })
  const [fast, setFast] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const snakeRef = useRef(snake)
  const foodRef = useRef(food)
  const nextDirRef = useRef<Direction>('RIGHT')
  const curDirRef = useRef<Direction>('RIGHT')
  const gameStateRef = useRef<GameState>('idle')
  const scoreRef = useRef(0)

  snakeRef.current = snake
  foodRef.current = food
  gameStateRef.current = gameState
  scoreRef.current = score

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const newDir = DIR_MAP[e.key]
      if (newDir && newDir !== OPPOSITE[curDirRef.current]) {
        nextDirRef.current = newDir
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault()
      }
      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault()
        if (gameStateRef.current === 'playing') setGameState('paused')
        else if (gameStateRef.current === 'paused') setGameState('playing')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Tick
  const tick = useCallback(() => {
    if (gameStateRef.current !== 'playing') return
    const d = nextDirRef.current
    curDirRef.current = d
    const head = snakeRef.current[0]
    const next: Point = {
      x: (head.x + (d === 'RIGHT' ? 1 : d === 'LEFT' ? -1 : 0) + COLS) % COLS,
      y: (head.y + (d === 'DOWN' ? 1 : d === 'UP' ? -1 : 0) + ROWS) % ROWS,
    }
    if (snakeRef.current.some(s => s.x === next.x && s.y === next.y)) {
      setGameState('dead')
      const nb = Math.max(scoreRef.current, Number(localStorage.getItem('snake_best') ?? 0))
      setBest(nb)
      try { localStorage.setItem('snake_best', String(nb)) } catch { /* noop */ }
      return
    }
    const ate = next.x === foodRef.current.x && next.y === foodRef.current.y
    const newSnake = ate
      ? [next, ...snakeRef.current]
      : [next, ...snakeRef.current.slice(0, -1)]
    if (ate) {
      setFood(randPoint(newSnake))
      setScore(s => s + 10)
    }
    setSnake(newSnake)
  }, [])

  useEffect(() => {
    if (gameState !== 'playing') return
    const id = setInterval(tick, fast ? TICK_FAST : TICK_NORMAL)
    return () => clearInterval(id)
  }, [gameState, fast, tick])

  const startGame = () => {
    const s = initSnake()
    setSnake(s)
    setFood(randPoint(s))
    curDirRef.current = 'RIGHT'
    nextDirRef.current = 'RIGHT'
    setScore(0)
    setGameState('playing')
  }

  const togglePause = () => setGameState(gs => gs === 'playing' ? 'paused' : 'playing')

  // Touch / swipe
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return
    const dx = e.changedTouches[0].clientX - touchRef.current.x
    const dy = e.changedTouches[0].clientY - touchRef.current.y
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) { touchRef.current = null; return }
    const nd: Direction = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? 'RIGHT' : 'LEFT')
      : (dy > 0 ? 'DOWN' : 'UP')
    if (nd !== OPPOSITE[curDirRef.current]) nextDirRef.current = nd
    touchRef.current = null
  }

  // D-pad
  const dpad = (d: Direction) => {
    if (d !== OPPOSITE[curDirRef.current]) nextDirRef.current = d
  }

  // Build cell lookup
  const snakeKeys = new Set(snake.map(p => `${p.x},${p.y}`))
  const headKey = snake[0] ? `${snake[0].x},${snake[0].y}` : ''

  return (
    <section className={`${styles.section} ${visible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.tag}>◆ SECTION 03</div>
          <h2 className={styles.heading}>小遊戲</h2>
          <div className={styles.headingLine} />
          <p className={styles.subheading}>貪吃蛇 — 方向鍵 / WASD 控制，吃越多分越高！</p>
        </header>

        {/* Scoreboard */}
        <div className={styles.scoreboard}>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>當前分數</span>
            <span className={styles.scoreValue}>{score}</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>最高分</span>
            <span className={styles.scoreValue} style={{ color: 'var(--gold)' }}>{best}</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>蛇長</span>
            <span className={styles.scoreValue}>{snake.length}</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreLabel}>速度</span>
            <button className={styles.speedBtn} onClick={() => setFast(f => !f)}>
              {fast ? '🐇 快速' : '🐢 普通'}
            </button>
          </div>
        </div>

        {/* Board */}
        <div className={styles.boardWrapper}>
          <div
            className={styles.board}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
          >
            {Array.from({ length: ROWS * COLS }, (_, i) => {
              const x = i % COLS
              const y = Math.floor(i / COLS)
              const k = `${x},${y}`
              const isHead = k === headKey
              const isBody = !isHead && snakeKeys.has(k)
              const isFood = food.x === x && food.y === y
              return (
                <div
                  key={k}
                  className={`${styles.cell}${isHead ? ' ' + styles.head : ''}${isBody ? ' ' + styles.body : ''}${isFood ? ' ' + styles.food : ''}`}
                />
              )
            })}

            {gameState === 'idle' && (
              <div className={styles.overlay}>
                <span className={styles.overlayIcon}>🐍</span>
                <h3>貪吃蛇</h3>
                <p>方向鍵 / WASD 控制<br />手機請用下方 D-Pad 或滑動</p>
                <button className={styles.startBtn} onClick={startGame}>開始遊戲</button>
              </div>
            )}
            {gameState === 'paused' && (
              <div className={styles.overlay}>
                <span className={styles.overlayIcon}>⏸</span>
                <h3>已暫停</h3>
                <button className={styles.startBtn} onClick={togglePause}>繼續</button>
              </div>
            )}
            {gameState === 'dead' && (
              <div className={`${styles.overlay} ${styles.deadOverlay}`}>
                <span className={styles.overlayIcon}>💀</span>
                <h3>遊戲結束</h3>
                <p>得分：<strong>{score}</strong></p>
                {score > 0 && score >= best && <p className={styles.newBest}>🏆 新紀錄！</p>}
                <button className={styles.startBtn} onClick={startGame}>再來一局</button>
              </div>
            )}
          </div>

          {gameState === 'playing' && (
            <button className={styles.pauseBtn} onClick={togglePause}>⏸ 暫停 (Space)</button>
          )}
        </div>

        {/* D-Pad */}
        <div className={styles.dpad}>
          <button className={`${styles.dpadBtn} ${styles.dpadUp}`}    onClick={() => dpad('UP')}>▲</button>
          <button className={`${styles.dpadBtn} ${styles.dpadLeft}`}  onClick={() => dpad('LEFT')}>◀</button>
          <div className={styles.dpadCenter} />
          <button className={`${styles.dpadBtn} ${styles.dpadRight}`} onClick={() => dpad('RIGHT')}>▶</button>
          <button className={`${styles.dpadBtn} ${styles.dpadDown}`}  onClick={() => dpad('DOWN')}>▼</button>
        </div>
      </div>
    </section>
  )
}
