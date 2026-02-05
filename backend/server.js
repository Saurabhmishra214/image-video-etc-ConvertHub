const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getDB } = require("./connection");
const userRoutes = require("./modules/user/user.routes");
const apiRoutes = require('./routes/apiRoutes');
const pageRoutes = require('./routes/pageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
// User table routes
app.use("/api/users", userRoutes);

// static frontend files (if needed)

app.use(express.static(path.join(__dirname, '../public')));


app.use('/', pageRoutes);
app.use('/api', apiRoutes);



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
