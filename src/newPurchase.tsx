import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  stock: number;
  price: number;
};

type PurchaseItem = {
  item_id: number;
  quantity: number;
};

export default function NewPurchase() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<PurchaseItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const handleQuantityChange = (item_id: number, quantity: number) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.item_id === item_id);
      if (existing) {
        return prev.map((i) =>
          i.item_id === item_id ? { ...i, quantity } : i
        );
      }
      return [...prev, { item_id, quantity }];
    });
  };

  const handleSubmit = async () => {
    const filteredItems = selectedItems.filter((i) => i.quantity > 0);
    if (!customerName || !shippingAddress || filteredItems.length === 0) {
      setMessage("Please fill all fields and select at least one item.");
      return;
    }

    const res = await fetch("http://localhost:3000/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        shipping_address: shippingAddress,
        items: filteredItems,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Purchase created successfully.");
      setCustomerName("");
      setShippingAddress("");
      setSelectedItems([]);
    } else {
      setMessage("❌ Error: " + (data.error || "Unknown error"));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Purchase</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          style={{ padding: 8 }}
        />
      </div>

      <h3>Select Items</h3>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Available</th>
            <th>Price</th>
            <th>Quantity to Buy</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const selected = selectedItems.find((i) => i.item_id === item.id);
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>₹{item.price}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    max={item.stock}
                    value={selected?.quantity || ""}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value || 0))
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button style={{ marginTop: 20 }} onClick={handleSubmit}>
        Submit Purchase
      </button>

      <p style={{ marginTop: 10 }}>{message}</p>
    </div>
  );
}
