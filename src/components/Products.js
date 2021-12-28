import { useState } from "react";
import Modal from "react-modal";
import { formatCurrency } from "../utils";

const Products = ({ products, addToCart }) => {
  const [product, setProduct] = useState(null);

  const openModal = (product) => {
    setProduct(product);
  };

  const closeModal = () => {
    setProduct(null);
  };

  return (
    <div>
      <ul className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product">
              <a href={`#${product._id}`} onClick={() => openModal(product)}>
                <img src={product.image} alt={product.title} />
                <p>{product.title}</p>
              </a>

              <div className="product-price">
                <div>{formatCurrency(product.price)}</div>
                <button
                  className="button primary"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {product && (
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
                  {product.availableSizes.map((item) => (
                    <span>
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
                      addToCart(product);
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
      )}
    </div>
  );
};

export default Products;
