const mongoose = require("mongoose");

const db = 'mongodb+srv://shopsmart:sam123@cluster0.rnhpuac.mongodb.net/shopsmart?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(db)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((e) => {
    console.log("❌ MongoDB connection failed:", e.message);
  });

module.exports = mongoose; // Export mongoose instance if needed elsewhere