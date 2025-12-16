import Privacy from "@/components/Privacy/Privacy";

export const metadata = {
  title: "Privacy Policy | Sicilian Taste",
  description:
    "Scopri come Sicilian Taste raccoglie, utilizza e protegge i tuoi dati personali nel rispetto del GDPR.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/privacy",
  },
};

const PrivacyPage = () => {
  return <Privacy />;
};

export default PrivacyPage;
