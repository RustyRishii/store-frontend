import Purchases from "../purchase";
import { useNavigate } from "react-router-dom";

export default function PurchasesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: 20,
          padding: "8px 16px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>All Purchases</h1>
      <Purchases />
    </div>
  );
}
