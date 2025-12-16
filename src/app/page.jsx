import {
  getAllProductsAction,
  searchProductsByNameAction,
} from "@/actions/product";
import { getSession } from "@/lib/session";
import HomePage from "@/components/HomePage/HomePage";

export const metadata = {
  title: {
    default:
      "Sicilian Taste | Presìdi Slow Food & Prodotti Artigianali Siciliani",
    template: "%s | Sicilian Taste",
  },

  description:
    "Sicilian Taste è la piattaforma dedicata ai Presìdi Slow Food e ai prodotti artigianali siciliani. Un marketplace che permette alle piccole aziende locali di raccontarsi, pubblicare i propri prodotti e venderli direttamente online.",

  applicationName: "Sicilian Taste",

  keywords: [
    "Sicilian Taste",
    "Presìdi Slow Food",
    "Prodotti tipici siciliani",
    "Eccellenze siciliane",
    "Cibo artigianale",
    "Aziende agricole siciliane",
    "Marketplace prodotti locali",
    "Vendita prodotti tipici online",
  ],

  authors: [{ name: "Damilola Abiola Wiwoloku" }],

  creator: "Damilola Abiola Wiwoloku",

  publisher: "Damilola Abiola Wiwoloku",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Sicilian Taste | Il gusto autentico della Sicilia",
    description:
      "Scopri i Presìdi Slow Food e i prodotti artigianali siciliani. Sicilian Taste aiuta le piccole aziende a vendere online e raccontare la loro storia.",
    url: "https://sicilian-taste-next.vercel.app",
    siteName: "Sicilian Taste",
    locale: "it_IT",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sicilian Taste | Presìdi Slow Food Siciliani",
    description:
      "Una piattaforma dedicata ai prodotti artigianali siciliani e ai Presìdi Slow Food.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const Page = async ({ searchParams }) => {
  const params = await searchParams;
  const searchQuery = params?.search || "";

  const session = await getSession();

  let searchResults = [];

  if (searchQuery.length > 0) {
    const res = await searchProductsByNameAction(searchQuery);
    searchResults = res.products || [];
  }

  const allProducts = await getAllProductsAction();
  const products = allProducts?.products || [];

  return (
    <HomePage
      session={session}
      products={products}
      searchResults={searchResults}
      searchQuery={searchQuery}
    />
  );
};

export default Page;
