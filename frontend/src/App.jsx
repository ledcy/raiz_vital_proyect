
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import SeccionCausas from './components/common/SeccionCausas';
import Mision from './components/common/Mision';
function App() {
  return (
    <div className="min-h-screen bg-arena">
      <Navbar />
      <Hero></Hero>
      <SeccionCausas></SeccionCausas>
      <Mision></Mision>
      <div>HOLA</div>
    </div>
  );
}
export default App