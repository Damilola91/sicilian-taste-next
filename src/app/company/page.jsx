import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getMyProductsAction } from "@/actions/product";
import CreateProductClient from "@/components/CreateProductClient/CreateProductClient";

const CompanyPage = async () => {
  const session = await getSession();

  if (!session || !["company", "admin"].includes(session.role)) {
    return redirect("/");
  }

  const { products } = await getMyProductsAction();

  return <CreateProductClient initialProducts={products} />;
};

export default CompanyPage;
