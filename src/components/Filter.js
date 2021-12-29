import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, filterByOrder } from "../redux/actions/productActions";

const Filter = () => {
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const items = useSelector((state) => state.products.items);
  const filteredItems = useSelector((state) => state.products.filteredItems);
  const dispatch = useDispatch();

  const filterProductsSize = (e) => {
    setSize(e.target.value);
    dispatch(filterProducts(items, e.target.value));
  };

  const filterProductsOrder = (e) => {
    const products = filteredItems === null ? items : filteredItems;
    setSort(e.target.value);
    dispatch(filterByOrder(products, e.target.value));
  };

  return (
    <div className="filter">
      <div className="filter-result">
        {filteredItems ? filteredItems.length : items && items.length} products
      </div>
      <div className="filter-sort">
        Order{" "}
        <select value={sort} onChange={(e) => filterProductsOrder(e)}>
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>

      <div className="filter-size">
        Filter{" "}
        <select value={size} onChange={(e) => filterProductsSize(e)}>
          <option value="">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
