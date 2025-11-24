const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

//Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    //validation : Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try{
        //Check if email already exists
        const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            //Create the user
            const user = await User.create({
                fullName,
                email,
                password,
                profileImageUrl,
            });

            res.status(201).json({
                _id: user._id,
                user,
                token: generateToken(user._id),
            });
    } catch (error) {
        res.status(500).json({ message: 'Error Registering User', error: error.message });
    }
};

//Login User
exports.loginUser = async(req, res) => {
    const { email, password } = req.body;

    //validation : Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    try {
        //Check for user email
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error Logging In', error: error.message });
    }
}

//Get User Info
exports.getUserInfo = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error Fetching User Info', error: error.message });
    }
}
