import { redirect } from "next/navigation";
import { getAllProductsAction } from "@/actions/product";

const PopularCategories = async () => {
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
    <section className="mx-auto max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
        Popular Categories
      </h2>

      <div className="flex justify-center flex-wrap gap-10">
        {categoriesToShow.map((category) => (
          <form action={goToCategory} key={category}>
            <input type="hidden" name="category" value={category} />

            <button
              type="submit"
              className="flex flex-col items-center hover:text-orange-500 transition"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-md hover:scale-105 transition">
                <img
                  src={getCategoryImage(category)}
                  alt={category}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-3 font-semibold capitalize">{category}</p>
            </button>
          </form>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
