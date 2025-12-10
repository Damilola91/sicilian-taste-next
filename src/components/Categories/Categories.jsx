"use client";

import { useRouter } from "next/navigation";

const Categories = ({ categories, images }) => {
  const router = useRouter();

  return (
    <div className="categories-page container my-5">
      <h2 className="text-center mb-4">Categories</h2>
      <div className="row justify-content-center gy-3">
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category}
              className="col-6 col-sm-6 col-md-4 col-lg-3 text-center"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/categories/${category}`)}
            >
              <div className="category-item">
                <img
                  src={images[category] ?? "https://via.placeholder.com/150"}
                  alt={category}
                  className="rounded-circle img-fluid category-image"
                />
                <p className="category-name mt-1">{category}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
