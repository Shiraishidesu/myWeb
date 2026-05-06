import { useState } from 'react'
import styles from './Navbar.module.css'

type Section = 'home' | 'about' | 'profile' | 'game'

interface NavbarProps {
  activeSection: Section
  navigateTo: (section: Section) => void
}

const navItems: { key: Section; label: string; symbol: string }[] = [
  { key: 'home', label: '首頁', symbol: '◈' },
  { key: 'about', label: '網站介紹', symbol: '◉' },
  { key: 'profile', label: '個人簡介', symbol: '◎' },
  { key: 'game', label: '小遊戲', symbol: '◆' },
]

export default function Navbar({ activeSection, navigateTo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.brand} onClick={() => navigateTo('home')}>
        <span className={styles.brandSymbol}>✦</span>
        <span className={styles.brandText}>MY SITE</span>
      </div>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="選單"
      >
        <span /><span /><span />
      </button>

      <ul className={`${styles.navList} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navItems.map(({ key, label, symbol }) => (
          <li key={key}>
            <button
              className={`${styles.navBtn} ${activeSection === key ? styles.active : ''}`}
              onClick={() => { navigateTo(key); setMenuOpen(false) }}
            >
              <span className={styles.navSymbol}>{symbol}</span>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
