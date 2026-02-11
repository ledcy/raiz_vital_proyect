function error404() {
    return(
        <div class="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center relative overflow-hidden px-6">
  
            <div class="absolute top-0 left-0 w-64 h-64 bg-[#2d5a27] opacity-[0.03] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#2d5a27] opacity-[0.03] rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div class="relative z-10 w-full max-w-4xl flex flex-col items-center">
                
                <h1 class="text-[12rem] md:text-[18rem] font-black text-[#2d5a27] opacity-[0.07] leading-none select-none">
                    404
                </h1>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <div class="w-20 h-1 bg-[#2d5a27] mb-6 rounded-full"></div>
                    <h2 class="text-4xl md:text-6xl font-bold text-[#1a2e1c] tracking-tight">
                    Página no encontrada
                    </h2>
                </div>
                <br />
                <br />
                <br />

    <div class="text-center max-w-xl">
      <p class="text-[#5c6d5e] text-xl md:text-2xl mb-12 leading-relaxed">
        Parece que este camino se ha cerrado. No te preocupes, siempre podemos volver a plantar una nueva ruta.
      </p>

      <div class="flex flex-col md:flex-row items-center justify-center gap-6">
        <a href="/" class="group relative px-12 py-4 bg-[#2d5a27] text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-xl shadow-green-900/20">
          <span class="relative z-10 flex items-center gap-2">
            Regresar al Inicio
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>

        <a href="/causas" class="px-12 py-4 text-[#2d5a27] font-bold border-2 border-[#2d5a27] rounded-full hover:bg-[#2d5a27] hover:text-white transition-all">
          Explorar Causas
        </a>
      </div>
    </div>
  </div>

  <div class="absolute bottom-10 left-0 right-0 flex justify-center opacity-30">
    <div class="flex items-center gap-4">
      <div class="h-[1px] w-20 bg-[#2d5a27]"></div>
      <span class="text-xs font-bold uppercase tracking-[0.4em] text-[#2d5a27]">Raíces de Vida</span>
      <div class="h-[1px] w-20 bg-[#2d5a27]"></div>
    </div>
  </div>
</div>
    );

}


export default error404;