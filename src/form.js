import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function HandleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const obj = { id: Date.now(), description, quantity, packed: false };

    onAddItems(obj);

    setDescription("");
    setQuantity(1);
    // console.log(obj);
  }

  return (
    <form className="add-form" onSubmit={HandleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}
