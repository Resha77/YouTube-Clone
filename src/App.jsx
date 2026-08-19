import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Video from './components/Video'

function App() {
  // Tracks whether the sidebar is collapsed or expanded.
  // This state is shared with the sidebar and the menu button in the navbar.
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Demo data used to preview how the video detail card would look.
  // This is not connected to real data yet, but it helps us test the layout.
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

  // Toggle sidebar open/closed when the menu button is clicked.
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="app">
      {/* Top navigation bar. It receives the sidebar toggle function as a prop. */}
      <Navbar onToggleSidebar={handleToggleSidebar} />

      <div className="app-body" style={styles.appBody}>
        {/* Sidebar width changes depending on the collapsed state. */}
        <Sidebar isCollapsed={isSidebarCollapsed} />

        {/*
          This main content block is currently commented out.
          It was likely used to test the Video component with sample data.
        */}
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