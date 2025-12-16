import SignUpForm from "@/components/SignUpForm/SignUpForm";

export const metadata = {
  title: "Registrati | Sicilian Taste",
  description:
    "Crea un account su Sicilian Taste per acquistare prodotti siciliani autentici e accedere ai servizi dedicati.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/register",
  },
};

const RegisterPage = () => {
  return <SignUpForm />;
};

export default RegisterPage;
