import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Video from './components/Video'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sample video object to test the Video component
  const sampleVideo = {
    title: 'React & Vite Full Project Walkthrough',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: heroImg,
    channelName: 'Code Channel',
    channelAvatar: reactLogo,
    subscribers: '250K',
    views: '1.2M',
    uploadedAt: '2 days ago',
    likes: 42000,
    description: 'Learn how to build modern web applications using React and Vite from scratch. In this video, we cover state management, layout setup, component architecture, and modular styling.'
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="app">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className="app-body" style={styles.appBody}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        {/* <main style={styles.mainContent}>
          <Video video={sampleVideo} />
        </main> */}

        

      </div>
    </div>
  )
}

const styles = {
  appBody: {
    display: 'flex',
    minHeight: 'calc(100vh - 56px)',
    backgroundColor: '#0f0f0f',
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
  },
};

export default App