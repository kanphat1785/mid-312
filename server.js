const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Connect MySQL (host = db จาก docker-compose)
const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "rootpassword",
  database: "coffee_shop"
});

app.get("/", (req, res) => {
  res.send("☕ Coffee Shop API is running!");
});

// Endpoint สั่งกาแฟ
app.post("/order", (req, res) => {
  const { customer, item } = req.body;
  db.query("INSERT INTO orders (customer, item) VALUES (?, ?)", [customer, item], (err) => {
    if (err) return res.status(500).send(err);
    res.send("✅ Order added!");
  });
});

// Endpoint ดูออเดอร์ทั้งหมด
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3000, () => console.log("🚀 Backend running on port 3000"));
