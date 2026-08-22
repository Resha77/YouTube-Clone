import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import VideoPreview from './components/VideoPreview'
import Video from './components/Video'

function App() {
  // Tracks whether the sidebar is collapsed or expanded.
  // This state is shared with the sidebar and the menu button in the navbar.
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Toggle sidebar open/closed when the menu button is clicked.
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="app" style={styles.app}>
      {/* Top navigation bar. It receives the sidebar toggle function as a prop. */}
      <Navbar onToggleSidebar={handleToggleSidebar} />

      <div className="app-body" style={styles.appBody}>
        {/* Sidebar width changes depending on the collapsed state. */}
        <Sidebar isCollapsed={isSidebarCollapsed} />

        {/* <main style={styles.mainContent}>
          <Video video={sampleVideo} />
        </main> */}

        <main style={styles.mainContent}>
          {selectedVideo ? (
            <>
              <Video video={selectedVideo} />
            </>
          ) : (
            <VideoPreview onVideoClick={handleVideoClick} />
          )}
        </main>

      </div>
    </div>
  )
}

const styles = {
  app: {
    width: '100%'
  },
  appBody: {
    display: 'flex',
    height: 'calc(100vh - 56px)',
    minHeight: 0,
    backgroundColor: '#0f0f0f',
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
    overflowY: 'auto',
    height: '100%',
  },
};

export default App