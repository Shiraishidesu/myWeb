import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.symbol}>✦</span>
        <span className={styles.text}>
          Built with <strong>React</strong> + <strong>TypeScript</strong> · {new Date().getFullYear()}
        </span>
        <span className={styles.symbol}>✦</span>
      </div>
    </footer>
  )
}
