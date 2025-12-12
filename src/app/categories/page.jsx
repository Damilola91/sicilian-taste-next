import { getSession } from "@/lib/session";
import CategoryPage from "@/components/CategoryPage/CategoryPage";

const CategoriesRoute = async () => {
  const session = await getSession();

  return <CategoryPage session={session} />;
};

export default CategoriesRoute;
