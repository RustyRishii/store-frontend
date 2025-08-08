// import { useEffect, useState } from "react";
// import NewPurchase from "./newPurchase";
// import Purchases from "./purchase";

// type Item = {
//   id: number;
//   name: string;
//   stock: number;
//   price: number;
// };

// export default function App() {
//   const [items, setItems] = useState<Item[]>([]);
//   const [form, setForm] = useState({ name: "", stock: "", price: "" });
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const fetchItems = async () => {
//     const res = await fetch("http://localhost:3000/items");
//     const data = await res.json();
//     setItems(data);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       name: form.name,
//       stock: Number(form.stock),
//       price: Number(form.price),
//     };

//     if (editingId) {
//       await fetch(`http://localhost:3000/items/${editingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//     } else {
//       await fetch("http://localhost:3000/items", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//     }

//     setForm({ name: "", stock: "", price: "" });
//     setEditingId(null);
//     fetchItems();
//   };

//   const deleteItems = async (id: number) => {
//     await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
//     fetchItems();
//   };

//   const handleEdit = (item: Item) => {
//     setForm({
//       name: item.name,
//       stock: item.stock.toString(),
//       price: item.price.toString(),
//     });
//     setEditingId(item.id);
//   };

//   return (
//     <div
//       style={{
//         padding: 20,
//         fontFamily: "Arial",
//         justifyContent: "center",
//         alignContent: "center",
//         justifyItems: "center",
//       }}
//     >
//       <h1>Inventory Management</h1>

//       <div
//         style={{
//           padding: 16,
//           marginBottom: 20,
//         }}
//       >
//         <div>
//           <input
//             name="name"
//             placeholder="Item Name"
//             value={form.name}
//             onChange={handleChange}
//             style={{
//               marginRight: 10,
//               padding: 8,
//               borderRadius: 16,
//               borderColor: "black",
//             }}
//           />
//           <input
//             type="number"
//             placeholder="stock"
//             name="stock"
//             value={form.stock}
//             onChange={handleChange}
//             style={{
//               marginRight: 10,
//               padding: 8,
//               borderRadius: 16,
//               borderColor: "black",
//             }}
//             required={true}
//             maxLength={50}
//             minLength={3}
//             pattern="[A-Za-z]+"
//             autoComplete="off"
//           />
//           <input
//             type="number"
//             placeholder="price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             style={{
//               marginRight: 10,
//               padding: 8,
//               borderRadius: 16,
//               borderColor: "black",
//             }}
//             required={true}
//             maxLength={50}
//             minLength={3}
//             pattern="[A-Za-z]+"
//             autoComplete="off"
//           />
//         </div>
//         <button
//           style={{
//             marginTop: 20,
//             padding: 12,
//             borderRadius: 16,
//             display: "block",
//             marginLeft: "auto",
//             marginRight: "auto",
//           }}
//           onClick={handleSubmit}
//         >
//           {editingId ? "Update" : "Add Item"}
//         </button>
//       </div>

//       <table border={1} cellPadding={10}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Stock</th>
//             <th>Price (₹)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.length === 0 && (
//             <tr>
//               <td colSpan={5}>No items in inventory</td>
//             </tr>
//           )}
//           {items.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.stock}</td>
//               <td>{item.price}</td>
//               <td>
//                 <button onClick={() => handleEdit(item)}>Edit</button>
//                 <button
//                   onClick={() => deleteItems(item.id)}
//                   style={{ marginLeft: 10 }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Purchases />

//       <NewPurchase />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
// import NewPurchase from "./components/NewPurchase";
import NewPurchase from "./newPurchase";
import { useNavigate } from "react-router-dom";

import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";

type Item = {
  id: number;
  name: string;
  stock: number;
  price: number;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({ name: "", stock: "", price: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchItems = async () => {
    const res = await fetch("http://localhost:3000/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      stock: Number(form.stock),
      price: Number(form.price),
    };

    if (editingId) {
      await fetch(`http://localhost:3000/items/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setForm({ name: "", stock: "", price: "" });
    setEditingId(null);
    fetchItems();
  };

  const deleteItems = async (id: number) => {
    await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleEdit = (item: Item) => {
    setForm({
      name: item.name,
      stock: item.stock.toString(),
      price: item.price.toString(),
    });
    setEditingId(item.id);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h1>Inventory Dashboard</h1>
        <button
          onClick={() => navigate("/purchases")}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          View Purchases
        </button>
      </header>

      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {/* Left: Item Form + Table */}
        <div style={{ flex: 1 }}>
          <ItemForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            editingId={editingId}
          />
          <ItemTable items={items} onEdit={handleEdit} onDelete={deleteItems} />
        </div>

        {/* Right: New Purchase */}
        <div style={{ flex: 1 }}>
          <NewPurchase />
        </div>
      </div>
    </div>
  );
}
