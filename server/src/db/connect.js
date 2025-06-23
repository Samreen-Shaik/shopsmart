const mongoose = require("mongoose");
// Middleware
const db = 'mongodb+srv://22pa1a05d4:kqswnHymjYBGJkuC@cluster0.1rjne9p.mongodb.net/shopping?retryWrites=true&w=majority'

// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017