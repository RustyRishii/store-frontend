type Props = {
  form: { name: string; stock: string; price: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  editingId: number | null;
};

export default function ItemForm({
  form,
  onChange,
  onSubmit,
  editingId,
}: Props) {
  return (
    <div style={{ marginBottom: 30 }}>
      <h2>{editingId ? "Edit Item" : "Add New Item"}</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={onChange}
          style={{ padding: 8, flex: 1 }}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={onChange}
          style={{ padding: 8, width: 80 }}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={onChange}
          style={{ padding: 8, width: 80 }}
        />
      </div>
      <button
        onClick={onSubmit}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#28a745",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {editingId ? "Update Item" : "Add Item"}
      </button>
    </div>
  );
}
