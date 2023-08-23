const Comment = require('../models/Comment');

const commentSeeds = [
    {
        content: 'Great post! Thanks for sharing.',
        user_id: 1,  // Referring to the first user in the userSeeds
        post_id: 1   // Referring to the first post in the postSeeds
    },
    {
        content: 'I totally agree with your points.',
        user_id: 2,  // Referring to the second user in the userSeeds
        post_id: 2   // Referring to the second post in the postSeeds
    },
    {
        content: 'JavaScript is truly versatile!',
        user_id: 3,  // Referring to the third user in the userSeeds
        post_id: 3   // Referring to the third post in the postSeeds
    },
];

const seedComments = async () => {
    await Comment.bulkCreate(commentSeeds);
};

module.exports = seedComments;

