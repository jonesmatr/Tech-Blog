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
];

const seedPosts = async () => {
    await Post.bulkCreate(postSeeds);
};

module.exports = seedPosts;

