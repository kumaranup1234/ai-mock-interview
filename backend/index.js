require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/authRoutes');
const mockRoutes = require('./routes/mockInterviewRoutes');
const { MONGO_URI } = require('./config/config.js');
const { connect } = require("mongoose");
const questionRoutes = require('./routes/questionRoutes');


const app = express();
app.set('trust proxy', 1)
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:5173",];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["POST", "GET", "PUT", "DELETE",],
    credentials: true
}));

app.use(express.json());

// root route to check is api running
app.get("/", (req, res) => {
    console.log(req.user);
    res.status(200).json({ message: "API is running successfully!" });
});


// user-related routes
app.use('/api/users', userRoutes);

// mock-interview routes
app.use('/api/mock', mockRoutes);

// question routes
app.use('/api/question', questionRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});