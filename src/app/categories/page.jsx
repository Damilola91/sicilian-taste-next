import { getSession } from "@/lib/session";
import CategoryPage from "@/components/CategoryPage/CategoryPage";

export default async function CategoriesRoute() {
  const session = await getSession();

  return <CategoryPage session={session} />;
}
