import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/footer.jsx';
import Home from './pages/home'
import AboutUs from "./pages/about-us.jsx";
import NotFound from "./pages/404.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Sileo from './assets/sileo.jsx';

import PublicRoute from '../routes/PublicRoute.jsx';

function App() {
  return (
    <div className="min-h-screen bg-arena">
      <Navbar />
      <Sileo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/register" element={<Register />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App