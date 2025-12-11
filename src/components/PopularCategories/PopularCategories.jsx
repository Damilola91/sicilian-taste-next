import { redirect } from "next/navigation";
import { getAllProductsAction } from "@/actions/product";

export default async function PopularCategories() {
  const data = await getAllProductsAction();
  const products = data.products || [];

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const categoriesToShow = categories.slice(0, 6);

  const getCategoryImage = (category) => {
    const p = products.find((prod) => prod.category === category);
    return p?.img || "/placeholder.png";
  };

  async function goToCategory(formData) {
    "use server";
    const category = formData.get("category");
    redirect(`/categories/${category}`);
  }

  return (
    <section className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>

      <div className="flex justify-center flex-wrap gap-6 mt-4">
        {categoriesToShow.map((category) => (
          <form action={goToCategory} key={category}>
            <input type="hidden" name="category" value={category} />

            <button type="submit" className="flex flex-col items-center">
              <div className="w-20 h-20 overflow-hidden rounded-full shadow-md hover:scale-105 transition">
                <img
                  src={getCategoryImage(category)}
                  alt={category}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 font-medium">{category}</p>
            </button>
          </form>
        ))}
      </div>
    </section>
  );
}
