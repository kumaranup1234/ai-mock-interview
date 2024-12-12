require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { clerkAuthMiddleware } = require("./config/clerkConfig");
const userRoutes = require('./routes/userRoutes');

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
    methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"],
    credentials: true
}));

app.use(express.json());

// root route to check is api running
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running successfully!" });
});

// user-related routes
app.use('/api/users', clerkAuthMiddleware,  userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});