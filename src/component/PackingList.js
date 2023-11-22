import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  /**************************************這邊不了解!!!!!!!!!!!!!!!!! ***********************************************/
  if (sortBy === "input") sortedItems = items;
  // slice() 方法會回傳一個新陣列物件，為原陣列選擇之 begin 至 end（不含 end）部分的淺拷貝（shallow copy）。而原本的陣列將不會被修改。
  // sort() 方法會原地（in place）對一個陣列的所有元素進行排序，並回傳此陣列。排序不一定是穩定的（stable）。預設的排序順序是根據字串的 Unicode 編碼位置（code points）而定。
  // localeCompare() 回傳一個數字，用來表示其與被比較的字串的先後順序。
  if (sortBy === "description")
    sortedItems = items
      .slice() // 回傳一個重組陣列
      .sort((a, b) => a.description.localeCompare(b.description)); //localeCompare 方法，這是一種基於地區的字符串比較方法。

  // items 按照 packed 屬性進行排序
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed)); //使用了一個比較函數，這個函數將商品的 packed 屬性轉換為數字（使用 Number 函數）

  /**************************************這邊不了解!!!!!!!!!!!!!! ***********************************************/
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
