import { useEffect, useState } from 'react'
import styles from './ProfileSection.module.css'

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  { name: 'HTML / CSS', level: 90, category: '前端' },
  { name: 'JavaScript', level: 80, category: '前端' },
  { name: 'React', level: 75, category: '前端' },
  { name: 'TypeScript', level: 65, category: '前端' },
  { name: 'Python', level: 70, category: '後端' },
  { name: 'Git / GitHub', level: 80, category: '工具' },
]

const interests = [
  { icon: '💻', label: '程式開發' },
  { icon: '🎵', label: '音樂欣賞' },
  { icon: '📚', label: '閱讀' },
  { icon: '🎮', label: '電玩遊戲' },
  { icon: '☕', label: '咖啡文化' },
  { icon: '🏃', label: '慢跑運動' },
]

const timeline = [
  { year: '2020', event: '第一次接觸程式設計', detail: 'HTML/CSS/JavaScript 入門' },
  { year: '2021', event: '進入金門大學', detail: '開始系統學習程式設計知識' },
  { year: '2024', event: '學習 TypeScript', detail: '強型別開發讓程式碼更穩固' },
  { year: '2025', event: '建立個人作品集', detail: '用 React+TS 完成這個網站！' },
]

export default function ProfileSection() {
  const [visible, setVisible] = useState(false)
  const [skillsAnimated, setSkillsAnimated] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50)
    const t2 = setTimeout(() => setSkillsAnimated(true), 400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className={`${styles.section} ${visible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.tag}>◎ SECTION 02</div>
          <h2 className={styles.heading}>個人簡介</h2>
          <div className={styles.headingLine} />
        </header>

        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            <div className={styles.avatarInner}>
              <span className={styles.avatarEmoji}>👨‍💻</span>
            </div>
            <div className={styles.avatarRing} />
          </div>
          <div className={styles.profileInfo}>
            <h3 className={styles.name}>楊松城</h3>
            <p className={styles.role}>學生 / 前端開發者</p>
            <p className={styles.bio}>
              嗨，我是一名對程式設計充滿熱情的學生，目前專注於前端開發領域。
              我喜歡把複雜的問題轉化為優雅的解決方案，並不斷探索新技術的可能性。
              這個網站是我用 React + TypeScript 完成的作品。
            </p>
            <div className={styles.contacts}>
              <a href="https://github.com/Shiraishidesu?tab=repositories" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                GitHub
              </a>
              <a href="japanhachi8@gmail.com" className={styles.contactLink}>
                Email
              </a>
            </div>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.skillsSection}>
            <h3 className={styles.sectionTitle}>技能水準</h3>
            <div className={styles.skillList}>
              {skills.map((skill) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillCategory}>{skill.category}</span>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                  <div className={styles.skillBar}>
                    <div
                      className={styles.skillFill}
                      style={{ width: skillsAnimated ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.interestsSection}>
            <h3 className={styles.sectionTitle}>興趣愛好</h3>
            <div className={styles.interestGrid}>
              {interests.map(({ icon, label }) => (
                <div key={label} className={styles.interestItem}>
                  <span className={styles.interestIcon}>{icon}</span>
                  <span className={styles.interestLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.timeline}>
          <h3 className={styles.sectionTitle}>學習歷程</h3>
          <div className={styles.timelineItems}>
            {timeline.map((item, i) => (
              <div key={i} className={styles.timelineItem} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <strong>{item.event}</strong>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
