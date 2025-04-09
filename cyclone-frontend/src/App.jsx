import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import FilterByYear from './pages/FilterByYear';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/filter-by-year" element={<FilterByYear />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
