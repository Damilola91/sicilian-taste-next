import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getMyProductsAction } from "@/actions/product";
import CreateProductClient from "@/components/CreateProductClient/CreateProductClient";
import AdminProductsList from "@/components/AdminProductList/AdminProductList";
import SendNewsletter from "@/components/SendNewsletter/SendNewsletter";

const AdminPage = async () => {
  const session = await getSession();
  const { products } = await getMyProductsAction();

  if (!session || session.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-14 space-y-20">
      <h1
        className="text-5xl text-center text-orange-500"
        style={{ fontFamily: "'Brush Script MT', cursive" }}
      >
        Admin Dashboard
      </h1>

      {/* LISTA PRODOTTI */}
      <AdminProductsList />

      {/* CREATE PRODUCT (riuso Company) */}
      <CreateProductClient initialProducts={products} />

      {/* NEWSLETTER */}
      <SendNewsletter />
    </main>
  );
};

export default AdminPage;
