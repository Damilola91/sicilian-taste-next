import { getPaginatedProductsAction } from "@/actions/products";
import SuperDeliciousClient from "./SuperDeliciousClient";

const SuperDelicious = async () => {
  const data = await getPaginatedProductsAction({ page: 1, pageSize: 8 });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  return <SuperDeliciousClient products={products} totalPages={totalPages} />;
};

export default SuperDelicious;
