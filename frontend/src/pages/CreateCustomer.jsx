import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../api";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    pin: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }
await fetch(`${API_BASE}/customers`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form)
});
    navigate("/");
  };

  return (
    <div className="container1">
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" required onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" required onChange={handleChange} />
        <input name="city" placeholder="City" required onChange={handleChange} />
        <input name="state" placeholder="State" required onChange={handleChange} />
        <input name="pin" placeholder="Pin Code" required onChange={handleChange} />
        <button type="submit">Save Customer</button>
      </form>
    </div>
  );
}
