import React from 'react';
import heroImg from '../assets/hero.jpg';

function AboutUs() {
  return (
    <div className="min-h-screen bg-arena py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-pizarra-azul mb-6">
            Sobre Nosotros
          </h1>
          <div className="w-24 h-1.5 bg-verde-bosque mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-pizarra-azul mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              En <span className="font-semibold text-verde-bosque">Raíces de Vida</span>, nuestra misión es conectar a personas apasionadas con causas que transforman vidas. Creemos en el poder de la comunidad para generar un impacto positivo y duradero.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              A través de nuestra plataforma, facilitamos la colaboración entre individuos, organizaciones y proyectos que buscan hacer del mundo un lugar mejor, asegurando que cada semilla plantada hoy se convierta en un bosque mañana.
            </p>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="../assets/hero.jpg" 
                alt="Voluntariado" 
                className="rounded-[2rem] shadow-2xl object-cover h-96 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg hidden md:block">
                <p className="text-verde-bosque font-bold text-2xl">+500</p>
                <p className="text-sm text-gray-500">Voluntarios Activos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-[3rem] p-8 md:p-16 border border-white/20 shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pizarra-azul mb-8">Nuestro Equipo</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestro equipo está compuesto por voluntarios dedicados que trabajan incansablemente para crear oportunidades de voluntariado significativas y accesibles. Nos esforzamos por construir una comunidad inclusiva donde cada persona pueda encontrar su lugar para contribuir y marcar una diferencia real.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-verde-bosque">12k+</p>
                <p className="text-sm text-gray-600 uppercase tracking-wider font-medium">Árboles Plantados</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-verde-bosque">50+</p>
                <p className="text-sm text-gray-600 uppercase tracking-wider font-medium">Proyectos</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-3xl font-bold text-verde-bosque">24/7</p>
                <p className="text-sm text-gray-600 uppercase tracking-wider font-medium">Compromiso</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;