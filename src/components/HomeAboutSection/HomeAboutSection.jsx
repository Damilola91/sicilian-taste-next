const HomeAboutSection = () => {
  return (
    <section className=" py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-4xl text-center text-orange-500">
          Cos’è Sicilian Taste
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
          <strong>Sicilian Taste</strong> è una piattaforma dedicata alla
          valorizzazione dei <strong>presìdi Slow Food</strong>, delle
          eccellenze gastronomiche siciliane e delle piccole realtà produttive
          locali.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h3 className="text-xl font-semibold text-orange-500">
              🌱 Qualità e Tradizione
            </h3>
            <p className="text-gray-600">
              Ogni prodotto racconta una storia fatta di territorio, rispetto
              della biodiversità e lavorazioni artigianali tramandate nel tempo.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h3 className="text-xl font-semibold text-orange-500">
              🤝 Supporto alle piccole aziende
            </h3>
            <p className="text-gray-600">
              Sicilian Taste nasce anche per aiutare le aziende sprovviste di un
              sito web a pubblicare e vendere i propri prodotti tramite una
              sezione dedicata.
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
          Le aziende possono esporre i loro prodotti, gestirli in autonomia e
          venderli direttamente dal sito, senza dover creare o mantenere un
          e-commerce personale.
        </p>
      </div>
    </section>
  );
};

export default HomeAboutSection;
