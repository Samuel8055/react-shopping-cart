import { useState } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";

const App = () => {
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>

      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>

          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>

      <footer>All rights reserved.</footer>
    </div>
  );
};

export default App;
