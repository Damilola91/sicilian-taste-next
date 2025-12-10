"use client";

import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import PopularCategories from "../PopularCategories/PopularCategories";
import SuperDelicious from "../SuperDelicious/SuperDelicious";
import Newsletter from "../Pages/Newsletter/Newsletter";
import "./Main.css";

const MainComponent = () => {
  const searchResults = useSelector(
    (state) => state.productSlice.searchProductsByName
  );
  const searchError = useSelector(
    (state) => state.productSlice.searchProductsError
  );

  return (
    <main className="container my-5">
      {searchResults?.length > 0 ? (
        <div className="row">
          {searchResults.map((product) => (
            <div className="col-md-3" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        searchError && <p>{searchError}</p>
      )}

      <PopularCategories />
      <SuperDelicious />
      <Newsletter />
    </main>
  );
};

export default MainComponent;
