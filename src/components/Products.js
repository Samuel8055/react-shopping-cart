import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { formatCurrency } from "../utils";
import { fetchProducts } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const Products = () => {
  const [product, setProduct] = useState(null);
  const [displayProducts, setDisplayProducts] = useState([]);
  const items = useSelector((state) => state.products.items);
  const filteredItems = useSelector((state) => state.products.filteredItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setProductsToDisplay();
  });

  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };

  const setProductsToDisplay = () => {
    filteredItems === null
      ? setDisplayProducts(items)
      : setDisplayProducts(filteredItems);
  };

  const renderModal = () =>
    product && (
      <Modal isOpen={true} onRequestClose={closeModal}>
        <div>
          <button onClick={closeModal} className="close-modal">
            x
          </button>
          <div className="product-details">
            <img src={product.image} alt={product.title} />

            <div className="product-details-description">
              <p>
                <strong>{product.title}</strong>
              </p>
              <p>{product.description}</p>
              <p className="margin">
                Available sizes:{" "}
                {product.availableSizes.map((item, index) => (
                  <span key={index}>
                    {" "}
                    <button className="button">{item}</button>
                  </span>
                ))}
              </p>
              <div className="product-price">
                <div>{formatCurrency(product.price)}</div>
                <button
                  className="button primary"
                  onClick={() => {
                    dispatch(addToCart(cartItems, product));
                    closeModal();
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );

  return (
    <div>
      {displayProducts && displayProducts.length == 0 ? (
        <div className="no-product-text">
          No product available with the selected size!
        </div>
      ) : (
        <ul className="products">
          {displayProducts &&
            displayProducts.map((item) => (
              <li key={item._id}>
                <div className="product">
                  <a href={`#${item._id}`} onClick={() => openModal(item)}>
                    <img src={item.image} alt={item.title} />
                    <p>{item.title}</p>
                  </a>

                  <div className="product-price">
                    <div>{formatCurrency(item.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => dispatch(addToCart(cartItems, item))}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}

      {renderModal()}
    </div>
  );
};

export default Products;
