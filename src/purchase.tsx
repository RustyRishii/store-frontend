import { useEffect, useState } from "react";

type Purchase = {
  id: number;
  customer_name: string;
  date: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/purchases")
      .then((res) => res.json())
      .then(setPurchases);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>All Purchases</h1>
      {purchases.map((purchase) => (
        <div
          key={purchase.id}
          style={{ marginBottom: 30, border: "1px solid #ccc", padding: 10 }}
        >
          <h3>Purchase #{purchase.id}</h3>
          <p>Customer: {purchase.customer_name}</p>
          <p>Date: {purchase.date}</p>

          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {purchase.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
