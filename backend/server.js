const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/customers", (req, res) => {
  const { firstName, lastName, phone, city, state, pin } = req.body;

  db.run(
    "INSERT INTO customers (firstName, lastName, phone, city, state, pin) VALUES (?,?,?,?,?,?)",
    [firstName, lastName, phone, city, state, pin],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get("/customers", (req, res) => {
  const { city, state, pin } = req.query;

  let query = "SELECT * FROM customers WHERE 1=1";
  let params = [];

  if (city) {
    query += " AND city LIKE ?";
    params.push(`%${city}%`);
  }
  if (state) {
    query += " AND state LIKE ?";
    params.push(`%${state}%`);
  }
  if (pin) {
    query += " AND pin LIKE ?";
    params.push(`%${pin}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/customers/:id", (req, res) => {
  db.get(
    "SELECT * FROM customers WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row);
    }
  );
});

app.put("/customers/:id", (req, res) => {
  const { firstName, lastName, phone } = req.body;

  db.run(
    "UPDATE customers SET firstName = ?, lastName = ?, phone = ? WHERE id = ?",
    [firstName, lastName, phone, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
});

app.delete("/customers/:id", (req, res) => {
  db.run(
    "DELETE FROM customers WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
});

app.post("/addresses", (req, res) => {
  const { customerId, addressLine, city, state, pin } = req.body;

  db.run(
    "INSERT INTO addresses (customerId, addressLine, city, state, pin) VALUES (?,?,?,?,?)",
    [customerId, addressLine, city, state, pin],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
});

app.get("/addresses/:customerId", (req, res) => {
  db.all(
    "SELECT * FROM addresses WHERE customerId = ?",
    [req.params.customerId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

app.put("/addresses/:id", (req, res) => {
  const { addressLine, city, state, pin } = req.body;

  db.run(
    "UPDATE addresses SET addressLine = ?, city = ?, state = ?, pin = ? WHERE id = ?",
    [addressLine, city, state, pin, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    }
  );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
