"use client";

import CompanyProductCard from "../CompanyProductCard/CompanyProductCard";

const CompanyProductsList = ({ products }) => {
  if (!products?.length) {
    return (
      <p className="text-center text-gray-500">
        Non hai ancora creato prodotti.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-3xl text-orange-500 mb-6 text-center">
        I tuoi prodotti
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <CompanyProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default CompanyProductsList;
