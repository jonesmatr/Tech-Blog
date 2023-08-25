document.addEventListener("DOMContentLoaded", function() {
    const createNewPostButton = document.querySelector('#create-new-post-button');
    const newPostForm = document.querySelector('#new-post-form');

    // Show/hide the new post form when the button is clicked
    createNewPostButton.addEventListener('click', () => {
        newPostForm.classList.toggle('hidden');
    });
});
