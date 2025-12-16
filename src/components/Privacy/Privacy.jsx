import { getSession } from "@/lib/session";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Privacy = () => {
  const session = getSession();

  return (
    <>
      <Navbar session={session} />
      <main className="max-w-4xl mx-auto px-4 py-20 space-y-10">
        <h1 className="text-4xl text-center text-orange-500">Privacy Policy</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-base">
          <p>
            Sicilian Taste tutela la privacy degli utenti e tratta i dati
            personali nel rispetto del Regolamento UE 2016/679 (GDPR).
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            1. Tipologia di Dati Raccolti
          </h2>
          <p>
            Possono essere raccolti dati identificativi, dati di contatto, dati
            di navigazione e informazioni necessarie alla gestione degli ordini.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            2. Finalità del Trattamento
          </h2>
          <p>
            I dati personali vengono utilizzati per fornire i servizi offerti,
            gestire ordini, comunicazioni e obblighi di legge.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            3. Conservazione dei Dati
          </h2>
          <p>
            I dati vengono conservati per il tempo strettamente necessario alle
            finalità per cui sono stati raccolti.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            4. Diritti dell’Utente
          </h2>
          <p>
            L’utente ha il diritto di accedere ai propri dati, richiederne la
            modifica, la cancellazione o la limitazione del trattamento.
          </p>

          <h2 className="text-2xl font-semibold text-orange-500">
            5. Sicurezza
          </h2>
          <p>
            Sicilian Taste adotta misure tecniche e organizzative adeguate per
            proteggere i dati personali da accessi non autorizzati.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Privacy;
