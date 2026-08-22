import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import VideoPreview from './components/VideoPreview'
import jerryThumbnail from './assets/subscriptions/Jerry.jpg'
import reshaThumbnail from './assets/subscriptions/ReshaKoju.jpg'
import sanyamThumbnail from './assets/subscriptions/Sanyam.jpg'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'React & Vite Full Project Walkthrough',
      thumbnail: heroImg,
      channelName: 'Code Channel',
      channelAvatar: reactLogo,
      views: '1.2M',
      uploadedAt: '2 days ago',
    },
    {
      id: 2,
      title: 'A quiet afternoon in the studio',
      thumbnail: jerryThumbnail,
      channelName: 'Jerry Doe',
      channelAvatar: jerryThumbnail,
      views: '2.5M',
      uploadedAt: '5 days ago',
    },
    {
      id: 3,
      title: 'Build better habits with a simple system',
      thumbnail: reshaThumbnail,
      channelName: 'Resha Koju',
      channelAvatar: reshaThumbnail,
      views: '840K',
      uploadedAt: '1 week ago',
    },
    {
      id: 4,
      title: 'What I learned from shipping my first app',
      thumbnail: sanyamThumbnail,
      channelName: 'Sanyam',
      channelAvatar: sanyamThumbnail,
      views: '310K',
      uploadedAt: '2 weeks ago',
    },
  ];


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

        <main style={styles.mainContent}>
          <div className="video-grid">
            {videos.map((video) => (
              <VideoPreview key={video.id} video={video} />
            ))}
          </div>
        </main>

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