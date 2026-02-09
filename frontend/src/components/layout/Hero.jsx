import heroBg from '../../assets/hero.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
      
      <div className="absolute inset-0 bg-black opacity-40"></div> 

      <div className="relative z-10 text-center max-w-4xl w-full px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Donde cada acción <br />
          <span className="italic">echa raíces</span>
          
        </h1>
      </div>
    </section>
  );
};

export default Hero;