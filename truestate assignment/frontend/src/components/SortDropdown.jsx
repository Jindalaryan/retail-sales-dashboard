export default function SortDropdown({ value, onChange }) {
  return (
    <div className="sort-dropdown">
      <label>Sort by: </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>
    </div>
  );
}
