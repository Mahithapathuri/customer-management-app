import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../api";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({ city: "", state: "", pin: "" });

  const fetchCustomers = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE}/customers?${query}`);

    const data = await res.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm("Delete customer?")) return;
   await fetch(`${API_BASE}/customers/${id}`, { method: "DELETE" });

    fetchCustomers();
  };

  return (
    <>
      <div className="container3">
        <h2>Customer List</h2>
        <Link to="/create">Create Customer</Link>
      </div>

      <div className="container">
        <input placeholder="City" onChange={e => setFilters({ ...filters, city: e.target.value })} />
        <input placeholder="State" onChange={e => setFilters({ ...filters, state: e.target.value })} />
        <input placeholder="Pin" onChange={e => setFilters({ ...filters, pin: e.target.value })} />
        <button onClick={fetchCustomers}>Search</button>
      </div>

      <ul>
        {customers.map(c => (
          <li key={c.id}>
            <Link to={`/customer/${c.id}`}>
              {c.firstName} {c.lastName}
            </Link>
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
