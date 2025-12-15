import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await getSession();

  if (!session || !["admin"].includes(session.role)) {
    return redirect("/");
  }

  return <h1>Admin Dashboard</h1>;
};

export default AdminPage;
