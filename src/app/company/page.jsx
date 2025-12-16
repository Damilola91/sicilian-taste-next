import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getMyProductsAction } from "@/actions/product";
import CreateProductClient from "@/components/CreateProductClient/CreateProductClient";

export const metadata = {
  title: "Area Aziende | Sicilian Taste",
  description:
    "Area riservata alle aziende e produttori siciliani per creare, gestire e vendere i propri prodotti su Sicilian Taste.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/company",
  },
};

const CompanyPage = async () => {
  const session = await getSession();

  if (!session || !["company", "admin"].includes(session.role)) {
    return redirect("/");
  }

  const { products } = await getMyProductsAction();

  return <CreateProductClient initialProducts={products} />;
};

export default CompanyPage;
