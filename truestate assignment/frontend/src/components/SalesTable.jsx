export default function SalesTable({ sales }) {
  if (!sales.length) {
    return <div className="no-results">No results found.</div>;
  }

  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Region</th>
          <th>Product</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Final Amount</th>
          <th>Payment</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((row, idx) => (
          <tr key={`${row["Customer ID"]}-${idx}`}>
            <td>{row["Date"]}</td>
            <td>{row["Customer Name"]}</td>
            <td>{row["Phone Number"]}</td>
            <td>{row["Customer Region"]}</td>
            <td>{row["Product Name"]}</td>
            <td>{row["Product Category"]}</td>
            <td>{row["Quantity"]}</td>
            <td>{row["Final Amount"]}</td>
            <td>{row["Payment Method"]}</td>
            <td>{row["Order Status"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
