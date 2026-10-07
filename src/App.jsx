import './App.css';
import { useState } from "react";

const initialItems = [
  {
    id: 1,
    name: "Black T shirt",
    price: 5,
  },
  {
    id: 2,
    name: "Hanger Set",
    price: 8,
  },
  {
    id: 3,
    name: "Thoub",
    price: 12,
  },
  {
    id: 4,
    name: "Computer Bag",
    price: 20,
  },
  {
    id: 5,
    name: "Couch",
    price: 50,
  },
  {
    id: 6,
    name: "Gaming Chair",
    price: 70,
  },
];

function App() {
  const [availableItems, setAvailableItems] = useState(initialItems);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(100);
  const [warningMessage, setWarningMessage] = useState(null);

  const handleAddToCart = (item) => {
    if (availableBalance >= item.price) {
      setShoppingCart([...shoppingCart, item]);
      setAvailableBalance(availableBalance - item.price);
      setAvailableItems(availableItems.filter((i) => i.id !== item.id));
      setWarningMessage(null);
    } else {
      setWarningMessage(
        "Insufficient funds. Your balance is too low to purchase this item",
      );
      setTimeout(() => {
        setWarningMessage(null);
      }, 4000);
    }
  };

  const handleRemoveFromShoppingCart = (item) => {
    setShoppingCart(shoppingCart.filter((i) => i.id !== item.id));
    setAvailableBalance(availableBalance + item.price);
    setAvailableItems([...availableItems, item]);
  };

  return (
    <>
      <h1>Sayed Hameds Closet</h1>

      <h2>Your Balance: {availableBalance}</h2>

      {warningMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{warningMessage}</p>
      )}

      <h2>Available Items</h2>
      {availableItems.length === 0 ? (
        <p>no items available</p>
      ) : (
        availableItems.map((item) => (
          <div className="items" key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))
      )}

      <h2>Shopping Cart</h2>
      {shoppingCart.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        shoppingCart.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button onClick={() => handleRemoveFromShoppingCart(item)}>
              Remove from Cart
            </button>
          </div>
        ))
      )}
    </>
  );
}

export default App;
