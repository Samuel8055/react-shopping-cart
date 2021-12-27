import { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

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

  // Add to cart
  const addToCart = (product) => {
    const allCartItems = cartItems.slice();
    let alreadyInCart = false;

    allCartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });

    if (!alreadyInCart) {
      allCartItems.push({ ...product, count: 1 });
    }

    setCartItems(allCartItems);
    localStorage.setItem("cartItems", JSON.stringify(allCartItems));
  };

  // Remove from cart
  const removeFromCart = (product) => {
    const allCartItems = cartItems.slice();
    const filteredCartItems = allCartItems.filter(
      (item) => item._id !== product._id
    );

    setCartItems(filteredCartItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
  };

  // Create order
  const createOrder = (order) => {
    alert(`Need to create order for ${order.name}`);
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
            <Products products={products} addToCart={addToCart} />
          </div>

          <div className="sidebar">
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>

      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
