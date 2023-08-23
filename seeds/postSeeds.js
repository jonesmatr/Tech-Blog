const { Post } = require('../models');

const postSeeds = [
    {
        title: 'My First Post',
        content: 'This is the content of my first post.',
        user_id: 1  // Referring to the first user in the userSeeds
    },
    {
        title: 'Another Day, Another Post',
        content: 'This is the content of my second post.',
        user_id: 2  // Referring to the second user in the userSeeds
    },
    {
        title: 'The Joys of Coding',
        content: 'Coding is both challenging and rewarding.',
        user_id: 3  // Referring to the third user in the userSeeds
    },
    {
        title: 'Why JavaScript is Awesome',
        content: 'JavaScript is versatile and widely used in web development.',
        user_id: 4  // Referring to the fourth user in the userSeeds
    },
    {
        title: 'Diving into Databases',
        content: 'Databases are crucial for storing and retrieving data efficiently.',
        user_id: 5  // Referring to the fifth user in the userSeeds
    }
];

const seedPosts = async () => {
    await Post.bulkCreate(postData);
};

module.exports = seedPosts;

