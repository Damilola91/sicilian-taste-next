import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getSession } from "@/lib/session";

const Terms = () => {
  const session = getSession();
  return (
    <>
      <Navbar session={session} />
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-10">
        <h1
          className="text-4xl text-center text-orange-500"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          Termini e Condizioni
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-base">
          <p>
            Sicilian Taste è una piattaforma digitale dedicata alla promozione e
            alla vendita di prodotti gastronomici siciliani, inclusi presìdi
            Slow Food e produzioni artigianali locali.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            1. Utenti e Aziende
          </h2>
          <p>
            Le aziende registrate sono responsabili della correttezza, qualità e
            completezza delle informazioni fornite sui prodotti pubblicati.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            2. Pubblicazione dei Prodotti
          </h2>
          <p>
            Sicilian Taste mette a disposizione una vetrina digitale per le
            aziende che non dispongono di un proprio e-commerce, consentendo la
            vendita diretta dei prodotti tramite la piattaforma.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            3. Ordini e Pagamenti
          </h2>
          <p>
            Gli ordini effettuati tramite la piattaforma costituiscono una
            proposta di acquisto. Sicilian Taste non è produttore diretto dei
            beni venduti.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            4. Responsabilità
          </h2>
          <p>
            Sicilian Taste non è responsabile per eventuali ritardi, inesattezze
            o problemi derivanti dalle informazioni fornite dalle aziende
            produttrici.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            5. Modifiche ai Termini
          </h2>
          <p>
            I presenti Termini e Condizioni possono essere aggiornati in
            qualsiasi momento senza preavviso.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
