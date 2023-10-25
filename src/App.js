import { useState } from "react";
import Logo from "./logo";
import Form from "./form";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

function PackingList({ items, onDeleteItem, toggleItem, onReset }) {
  const [sortby, setSortBy] = useState("input");

  let sortedItems;

  if (sortby === "input") {
    sortedItems = items;
  }

  if (sortby === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortby === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            onDeleteItem={onDeleteItem}
            item={item}
            toggleItem={toggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select
          value={sortby}
          onChange={(e) => setSortBy((sortby) => e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onReset}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, toggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  }

  const itemLength = items.length;
  const itempacked = items.filter((items) => items.packed === true).length;
  const percentage = Math.round((itempacked / items.length) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage < 100
          ? `💼 You have ${itemLength} items on your list, and you already packed 
        ${itempacked} (${percentage}%)`
          : "You've got everything! Ready to go✈️"}
      </em>
    </footer>
  );
}

export default function App() {
  const [items, setItem] = useState([]);

  function addItem(item) {
    setItem((items) => [...items, item]);
  }

  function deleteItem(id) {
    // console.log(id);
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function toggleItem(id) {
    setItem((items) =>
      items.map((items) =>
        items.id === id ? { ...items, packed: !items.packed } : items
      )
    );
  }

  function reset() {
    let conform = window.confirm(
      "Are you sure that you want to delete everything?"
    );

    if (conform) {
      setItem((items) => []);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={addItem} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        toggleItem={toggleItem}
        onReset={reset}
      />
      <Stats items={items} />
    </div>
  );
}
