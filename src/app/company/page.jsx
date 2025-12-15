import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import CreateProductClient from "@/components/CreateProductClient/CreateProductClient";

const CompanyPage = async () => {
  const session = await getSession();
  if (!session || !["company", "admin"].includes(session.role)) {
    return redirect("/");
  }

  return <CreateProductClient />;
};

export default CompanyPage;
