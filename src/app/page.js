import {
  getAllProductsAction,
  searchProductsByNameAction,
} from "@/actions/product";
import { getSession } from "@/lib/session";
import HomePage from "@/components/HomePage/HomePage";

export default async function Page({ searchParams }) {
  // ⬅️ FIX: searchParams è una Promise
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
}
