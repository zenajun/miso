import { apps } from 'app-nav/apps'
import './App.css'

function App() {
  return (
    <main className="home">
      <h1>Miso</h1>
      <p className="tagline">All my apps in one place.</p>

      <ul className="app-grid">
        {apps.map((app) => (
          <li key={app.name}>
            <a className="app-card" href={app.path}>
              <span className="emoji" aria-hidden="true">
                {app.emoji}
              </span>
              <h2>{app.name}</h2>
              <p>{app.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
