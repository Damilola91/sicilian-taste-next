"use client";

import { useRouter } from "next/navigation";

const CategoryProductsList = ({ products }) => {
  const router = useRouter();

  return (
    <div className="row gy-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="col-6 col-sm-6 col-md-4 col-lg-3 text-center"
        >
          <div
            className="product-item"
            style={{ cursor: "pointer" }}
            onClick={() => router.push(`/recipe/${product._id}`)}
          >
            <img
              src={product.img}
              alt={product.name}
              className="img-fluid product-image"
            />
            <p className="product-name mt-1">{product.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProductsList;
