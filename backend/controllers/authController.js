const User = require('../models/User');
const { generateToken } = require("../utils/jwtUtils");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        const token = generateToken(newUser._id);
        await newUser.save();
        return res.json({
            token,
            user: {
                name:newUser.name,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({ message: 'Error registering user',error: true });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        return res.json({
            token,
            user: { _id:user._id,email: user.email,name:user.name } // Ensure you are returning user information
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            error: true,
            message: 'Error logging in' });
    }
};

exports.logout = (req, res) => {
    return res.status(200).json({ message: 'Logout successful' });
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({message:'Old password and new password are required'})
    }

    const user = await User.findById(userId).select('+password');

    if (!user) {
        return res.status(400).json({message:'Invalid user id or user does not exist'});
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
        return res.status(400).json({message:'Invalid Old Password'});
    }
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
};