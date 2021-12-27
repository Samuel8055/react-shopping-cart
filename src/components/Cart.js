import { useState } from "react";
import { formatCurrency } from "../utils";

const Cart = ({ cartItems, removeFromCart, createOrder }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    address: "",
  });

  // change handler for checkout form inputs
  const handleInput = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler for checkout form
  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      name: formState.name,
      email: formState.email,
      address: formState.address,
      cartItems,
    };

    createOrder(order);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">No items in cart</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} items in cart
        </div>
      )}

      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>

                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      className="button"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total: {""}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>

            {showCheckout && (
              <div className="cart">
                <form onSubmit={handleSubmit}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label htmlFor="">Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <button type="submit" className="button primary">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
