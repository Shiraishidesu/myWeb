import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProfileSection from './components/ProfileSection'
import GameSection from './components/GameSection'
import Footer from './components/Footer'

type Section = 'home' | 'about' | 'profile' | 'game'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = (section: Section) => {
    if (section === activeSection) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSection(section)
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 300)
  }

  useEffect(() => {
    document.title =
      activeSection === 'home' ? '我的個人網站'
      : activeSection === 'about' ? '網站介紹 | 我的個人網站'
      : activeSection === 'profile' ? '個人簡介 | 我的個人網站'
      : '小遊戲 | 我的個人網站'
  }, [activeSection])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeSection={activeSection} navigateTo={navigateTo} />
      <main
        style={{
          flex: 1,
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {activeSection === 'home' && <HeroSection navigateTo={navigateTo} />}
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'game' && <GameSection />}
      </main>
      <Footer />
    </div>
  )
}

export default App
