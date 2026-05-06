import { useEffect, useState } from 'react'
import styles from './HeroSection.module.css'

type Section = 'home' | 'about' | 'profile' | 'game'

interface HeroSectionProps {
  navigateTo: (section: Section) => void
}

const cards = [
  { section: 'about' as Section, symbol: '◉', title: '網站介紹', desc: '了解這個網站的目的與功能架構', color: '#c0392b' },
  { section: 'profile' as Section, symbol: '◎', title: '個人簡介', desc: '認識我的背景、技能與興趣愛好', color: '#d4a843' },
  { section: 'game' as Section, symbol: '◆', title: '小遊戲', desc: '來玩一場文字猜謎挑戰吧！', color: '#16a085' },
]

export default function HeroSection({ navigateTo }: HeroSectionProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`${styles.hero} ${visible ? styles.visible : ''}`}>
      <div className={styles.decorLine} />
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span>WELCOME TO MY PERSONAL SITE</span>
          <span className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleKanji}>個</span>
          <span className={styles.titleKanji}>人</span>
          <span className={styles.titleKanji}>網</span>
          <span className={styles.titleKanji}>站</span>
        </h1>

        <p className={styles.subtitle}>
          用 React + TypeScript 打造的作品集網站<br />
          探索三個不同的區域，認識更多關於我的事
        </p>

        <div className={styles.cards}>
          {cards.map((card, i) => (
            <button
              key={card.section}
              className={styles.card}
              style={{ animationDelay: `${0.4 + i * 0.15}s`, '--card-accent': card.color } as React.CSSProperties}
              onClick={() => navigateTo(card.section)}
            >
              <span className={styles.cardSymbol} style={{ color: card.color }}>{card.symbol}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
              <span className={styles.cardArrow}>→</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.decorCorner} />
    </section>
  )
}
