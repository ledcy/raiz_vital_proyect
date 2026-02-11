import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './pages/home'
import AboutUs from "./pages/about-us.jsx";
import NotFound from "./pages/404.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";


function App() {
  return (
    <div className="min-h-screen bg-arena">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
