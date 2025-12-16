import Terms from "@/components/Terms/Terms";

export const metadata = {
  title: "Termini e Condizioni | Sicilian Taste",
  description:
    "Consulta i Termini e Condizioni di utilizzo di Sicilian Taste. Informazioni legali sull’uso della piattaforma e dei servizi.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/terms",
  },
};

const TermsPage = () => {
  return <Terms />;
};

export default TermsPage;
