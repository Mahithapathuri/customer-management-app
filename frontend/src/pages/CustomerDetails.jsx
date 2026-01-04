import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE from "../api";

export default function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    pin: ""
  });

  const loadData = async () => {
    const c = await fetch(`${API_BASE}/customers/${id}`).then(r => r.json());
    const a = await fetch(`${API_BASE}/addresses/${id}`).then(r => r.json());
    setCustomer(c);
    setAddresses(a);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const updateCustomer = async () => {
    await fetch(`${API_BASE}/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone
      })
    });
  };

  const addAddress = async () => {
    await fetch(`${API_BASE}/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newAddress, customerId: id })
    });
    setNewAddress({ addressLine: "", city: "", state: "", pin: "" });
    loadData();
  };

  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index] = { ...updated[index], [field]: value };
    setAddresses(updated);
  };

  const updateAddress = async index => {
    const address = addresses[index];
    await fetch(`${API_BASE}/addresses/${address.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address)
    });
  };

  if (!customer) return null;

  return (
    <div className="container4">
      <h2>Customer Details</h2>

      <input
        value={customer.firstName}
        onChange={e => setCustomer({ ...customer, firstName: e.target.value })}
      />
      <input
        value={customer.lastName}
        onChange={e => setCustomer({ ...customer, lastName: e.target.value })}
      />
      <input
        value={customer.phone}
        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
      />
      <button onClick={updateCustomer}>Update Customer</button>

      <h3>
        Addresses ({addresses.length === 1 ? "Only One Address" : "Multiple Addresses"})
      </h3>

      {addresses.map((a, i) => (
        <div key={a.id} className="address-card">
          <input
            value={a.addressLine}
            onChange={e => handleAddressChange(i, "addressLine", e.target.value)}
          />
          <input
            value={a.city}
            onChange={e => handleAddressChange(i, "city", e.target.value)}
          />
          <input
            value={a.state}
            onChange={e => handleAddressChange(i, "state", e.target.value)}
          />
          <input
            value={a.pin}
            onChange={e => handleAddressChange(i, "pin", e.target.value)}
          />
          <button onClick={() => updateAddress(i)}>Update Address</button>
        </div>
      ))}

      <h4>Add New Address</h4>
      <input
        value={newAddress.addressLine}
        onChange={e => setNewAddress({ ...newAddress, addressLine: e.target.value })}
      />
      <input
        value={newAddress.city}
        onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
      />
      <input
        value={newAddress.state}
        onChange={e => setNewAddress({ ...newAddress, state: e.target.value })}
      />
      <input
        value={newAddress.pin}
        onChange={e => setNewAddress({ ...newAddress, pin: e.target.value })}
      />
      <button onClick={addAddress}>Add Address</button>
    </div>
  );
}
