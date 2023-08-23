const User = require('../models/User');  // Make sure the path to your models is correct

const userData = [
    {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123'  // Note: In a real scenario, store hashed passwords
    },
    {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'hashedPassword456'  // Ensure this is hashed
    },
    {
        username: 'alice_wonder',
        email: 'alice@example.com',
        password: 'hashedPassword789'  // Ensure this is hashed
    }
];

const seedUsers = async () => {
    await User.bulkCreate(userData);
};

module.exports = seedUsers;

