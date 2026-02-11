import Hero from "../components/layout/Hero";
import SeccionCausas from "../components/common/SeccionCausas";
import Mision from "../components/common/Mision";

function home() {
  return (
    <div className="min-h-screen bg-arena">
      <Hero></Hero>
      <Mision></Mision>
      <SeccionCausas></SeccionCausas>
    </div>
  );
}
export default home;