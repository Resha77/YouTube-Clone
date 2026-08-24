import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import VideoPreview from './components/VideoPreview'
import Video from './components/Video'
import HistoryPage from './components/HistoryPage';


function App() {
  // Tracks whether the sidebar is collapsed or expanded.
  // This state is shared with the sidebar and the menu button in the navbar.
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  // Stores the exact title selected from the navbar suggestions.
  const [searchTitle, setSearchTitle] = useState('');

  const [currentView, setCurrentView] = useState('home'); //'home' | history
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('watchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Toggle sidebar open/closed when the menu button is clicked.
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setHistory((prev) => {
      const filtered = prev.filter((v) => v.id !== video.id);
      const updated = [video, ...filtered];
      localStorage.setItem('watchHistory', JSON.stringify(updated));
      return updated;
    });
  };

  const handleYouTubeLogoClick = () => {
    setSelectedVideo(null);
    setSearchTitle('');
    setCurrentView('home');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedVideo(null);
  };
  
  return (
    <div className="app" style={styles.app}>
      {/* Top navigation bar. It receives the sidebar toggle function as a prop. */}
      <Navbar
        onToggleSidebar={handleToggleSidebar}
        onYouTubeLogoClick={handleYouTubeLogoClick}
        onSuggestionSelect={(title) => {
          // Return to the list view and apply the selected title filter.
          setSelectedVideo(null);
          setSearchTitle(title);
        }}
      />

      <div className="app-body" style={styles.appBody}>
        {/* Sidebar width changes depending on the collapsed state. */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onNavigate={handleNavigate}
        />

        {/* <main style={styles.mainContent}>
          <Video video={sampleVideo} />
        </main> */}

        <main style={styles.mainContent}>
          {selectedVideo ? (
            <Video video={selectedVideo} />
          ) : currentView === 'history' ? (
            <HistoryPage history={history} onVideoClick={handleVideoClick} />
          ) : (
            <VideoPreview onVideoClick={handleVideoClick} searchTitle={searchTitle} />
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
    cursor: 'pointer',
  },
};

export default App