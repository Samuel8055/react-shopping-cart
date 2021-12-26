import { useState } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  // Filter by size
  const filterProducts = (event) => {
    if (event.target.value === "") {
      setSize(event.target.value);
      setProducts(data.products);
    } else {
      setSize(event.target.value);
      setProducts(
        data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        )
      );
    }
  };

  // filter by order
  const sortProducts = (event) => {
    const sortValue = event.target.value;
    console.log(sortValue);

    setSort(sortValue);
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sortValue === "Lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sortValue === "Highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        )
    );
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>

      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} />
          </div>

          <div className="sidebar">Cart items</div>
        </div>
      </main>

      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
