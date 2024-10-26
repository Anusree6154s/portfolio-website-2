import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { fetchProjects } from './utils/Projects.utils'
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const [projects, setProjects] = useState([])

  const lightModeDefault = sessionStorage.getItem('theme') ? JSON.parse(sessionStorage.getItem('theme')) : true
  const [lightMode, setLightMode] = useState(lightModeDefault)

  useEffect(() => {
    if (!sessionStorage.getItem('projects')) {
      console.log('fetchprojects called')
      fetchProjects(setProjects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    sessionStorage.setItem('theme', lightMode)
  }, [lightMode])



  useEffect(() => {
    if (projects.length) {
      sessionStorage.setItem('projects', JSON.stringify(projects))
    }
  }, [projects])

  return (
    <ThemeContext.Provider value={{ lightMode, setLightMode }}>
      <div className="App">
        <main>
          <Router>
            <Header />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
              </Routes>
            </div>
          </Router>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
