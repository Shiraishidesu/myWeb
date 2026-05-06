import { useEffect, useRef, useState } from 'react'
import styles from './AboutSection.module.css'

const features = [
  { icon: '⬡', title: 'React + TypeScript', desc: '使用現代前端框架與強型別語言開發，確保程式碼品質與可維護性。' },
  { icon: '⬡', title: '響應式設計', desc: '完整支援桌機、平板與手機等不同裝置，提供最佳瀏覽體驗。' },
  { icon: '⬡', title: 'Vite 建構工具', desc: '採用超快速的 Vite 作為開發工具，模組熱更新讓開發效率大幅提升。' },
  { icon: '⬡', title: 'GitHub Pages 部署', desc: '透過 GitHub Actions 自動化部署流程，讓版本管理更加便利。' },
]

const techStack = [
  { name: 'React 18', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Vite', color: '#646cff' },
  { name: 'CSS Modules', color: '#d4a843' },
  { name: 'GitHub Pages', color: '#333' },
]

export default function AboutSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`${styles.section} ${visible ? styles.visible : ''}`} ref={ref}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.tag}>◉ SECTION 01</div>
          <h2 className={styles.heading}>網站介紹</h2>
          <div className={styles.headingLine} />
        </header>

        <div className={styles.intro}>
          <div className={styles.introText}>
            <p>
              這是一個使用 <strong>React + TypeScript</strong> 開發的個人作品集網站，
              作為課程作業的期末專案。網站採用現代化的前端技術棧，
              展示了元件化設計、型別安全以及優雅的使用者介面。
            </p>
            <p>
              網站分為三個主要區域：<strong>網站介紹</strong>說明本站的技術架構與設計理念，
              <strong>個人簡介</strong>介紹作者的背景與技能，
              <strong>小遊戲</strong>提供互動娛樂體驗。
            </p>
          </div>

          <div className={styles.techStack}>
            <div className={styles.techTitle}>技術棧</div>
            <div className={styles.techList}>
              {techStack.map(tech => (
                <span
                  key={tech.name}
                  className={styles.techBadge}
                  style={{ borderColor: tech.color, color: tech.color }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.features}>
          {features.map((f, i) => (
            <div
              key={i}
              className={styles.featureCard}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.archDiagram}>
          <h3 className={styles.archTitle}>專案結構</h3>
          <pre className={styles.archTree}>{`my-portfolio/
├── src/
│   ├── components/     # React 元件
│   ├── styles/         # 全域樣式
│   ├── App.tsx         # 根元件
│   └── main.tsx        # 入口點
├── index.html
├── vite.config.ts
└── package.json`}</pre>
        </div>
      </div>
    </section>
  )
}
