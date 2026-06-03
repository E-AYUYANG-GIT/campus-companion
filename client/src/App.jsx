import { Routes, Route } from 'react-router-dom'
import Background from './components/shared/Background'
import Header from './components/shared/Header'
import ActionBar from './components/shared/ActionBar'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import SuccessPage from './pages/SuccessPage'

function App() {
  return (
    <div className="app-shell">
      {/* Shared background layer */}
      <Background />

      {/* Shared header */}
      <Header />

      {/* Page content */}
      <main className="page-content">
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/map"     element={<MapPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </main>

      {/* Bottom action bar / tab nav */}
      <ActionBar />
    </div>
  )
}

export default App
