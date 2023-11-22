import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  // onClick按enter不會有反應，onSubmit才會有反應
  // controlled elements是react控制並擁有輸入字串的state
  // state：Internal data, owned by component as its "memory".Can be updated by the component itself, updating state causes component to re-render. Used to make components interactive.
  // props：External data, owned by parent component.Similiar to function parameters.Read-only.Receiving new props causes component to re-render. Usually when the parent's state has been updated.
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
// Array.from()：把ArrayLike對象(類陣列)或是 Iterable對象轉換成Array陣列對象的方法。
// ArrayLike是和array很像的陣列，但不是陣列。ArrayLike對象不能使用push、map等方法，但具有length的屬性，可以進行更迭的操作。例如：取得dom 元素的nodeList 或是 HTMLCollection類型
