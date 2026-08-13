import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navbar/>
      <Sidebar isCollapsed={false} />
    </div>
  )
}

export default App
