import ContactPage from "@/components/ContactPage/ContactPage";

export const metadata = {
  title: "Contatti | Sicilian Taste",
  description:
    "Contatta il team di Sicilian Taste per informazioni, supporto o collaborazioni con produttori locali.",
  alternates: {
    canonical: "/contact",
  },
};

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
