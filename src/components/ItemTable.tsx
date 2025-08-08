type Item = {
  id: number;
  name: string;
  stock: number;
  price: number;
};

type Props = {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
};

export default function ItemTable({ items, onEdit, onDelete }: Props) {
  return (
    <div>
      <h2>Inventory</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: 10, border: "1px solid #ccc" }}>ID</th>
            <th style={{ padding: 10, border: "1px solid #ccc" }}>Name</th>
            <th style={{ padding: 10, border: "1px solid #ccc" }}>Stock</th>
            <th style={{ padding: 10, border: "1px solid #ccc" }}>Price</th>
            <th style={{ padding: 10, border: "1px solid #ccc" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 10 }}>
                No items in inventory.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  {item.id}
                </td>
                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  {item.name}
                </td>
                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  {item.stock}
                </td>
                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  ₹{item.price}
                </td>
                <td style={{ padding: 10, border: "1px solid #ccc" }}>
                  <button onClick={() => onEdit(item)}>Edit</button>
                  <button
                    onClick={() => onDelete(item.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
