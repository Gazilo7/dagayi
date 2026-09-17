"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace(/[₦,]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="cart-page">
      <h1>YOUR CART</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div
                className="cart-item"
                key={`${item.slug}-${item.size}-${index}`}
              >
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  <p>
                    ₦{(
                      Number(item.price.replace(/[₦,]/g, "")) *
                      item.quantity
                    ).toLocaleString()}
                  </p>

                  <p>Size: {item.size}</p>

                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(index)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
  <div className="cart-total">
    <p>TOTAL</p>
    <strong>₦{total.toLocaleString()}</strong>
  </div>

  <button
  className="checkout-button"
  onClick={() => alert("Checkout coming soon.")}
>
  PROCEED TO CHECKOUT
</button>
</div>
        </>
      )}
    </main>
  );
}