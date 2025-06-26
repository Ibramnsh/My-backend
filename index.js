const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://my-frontend-taupe.vercel.app", "http://localhost:3000"], // Hapus slash di akhir
  })
);
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Root route
app.get("/", (req, res) => {
  res.json({ status: "Backend is running!" });
});

// API routes
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Vercel Backend!" });
});

app.post("/api/greet", (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    res.json({ message: `Hello, ${name}!` });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Handle 404 (hanya satu handler)
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handler (pindahkan ke paling bawah)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Local server
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
