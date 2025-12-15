import { getPaginatedProductsAction } from "@/actions/product";
import { getSession } from "@/lib/session";
import SuperDeliciousClient from "../SuperDeliciousClient/SuperDelicoiusClient";

const SuperDelicious = async () => {
  const data = await getPaginatedProductsAction({ page: 1, pageSize: 8 });
  const products = data?.products || [];
  const session = await getSession();

  return <SuperDeliciousClient products={products} session={session} />;
};

export default SuperDelicious;
