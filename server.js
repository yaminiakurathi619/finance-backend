const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Record = require("./models/Record");

const app = express();
app.use(express.json());

const authorize = (roles) => (req, res, next) => {
  const role = req.headers.role?.toLowerCase();

  if (!roles.includes(role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

mongoose
  .connect(
    "mongodb+srv://admin:Admin7893@cluster0.sdwbfit.mongodb.net/finance?retryWrites=true&w=majority",
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server working");
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/records", authorize(["admin"]), async (req, res) => {
  try {
    if (!req.body.amount) {
      return res.status(400).json({ message: "Amount required" });
    }
    const record = await Record.create(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/records", authorize(["admin", "analyst"]), async (req, res) => {
  try {
    const filter = {};

    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;

    const records = await Record.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/records/:id", authorize(["admin"]), async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(record);
});

app.delete("/records/:id", authorize(["admin"]), async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.get(
  "/dashboard/summary",
  authorize(["admin", "analyst"]),
  async (req, res) => {
    try {
      const records = await Record.find();

      let income = 0;
      let expense = 0;

      records.forEach((r) => {
        if (r.type === "income") {
          income += r.amount;
        } else {
          expense += r.amount;
        }
      });

      res.json({
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
