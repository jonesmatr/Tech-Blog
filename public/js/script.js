document.addEventListener("DOMContentLoaded", function () {
    // Show/hide new post form
    const createNewPostButton = document.querySelector('#create-new-post-button');
    const newPostForm = document.querySelector('#new-post-form');
    createNewPostButton.addEventListener('click', () => {
        newPostForm.classList.toggle('hidden');
    });

    // Delete post
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = event.target.getAttribute('data-id');
            const response = await fetch(`/api/posts/delete/${postId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                location.reload();
            }
        });
    });

    // Edit post
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = event.target.getAttribute('data-id');

            // Fetch existing post data
            const response = await fetch(`/api/posts/${postId}`);
            if (!response.ok) {
                // Handle error
                return;
            }
            const postData = await response.json();

            // Populate edit form
            document.getElementById('edit-post-title').value = postData.title;
            document.getElementById('edit-post-content').value = postData.content;

            // Assuming you're showing your edit form here (e.g., modal)
        });
    });

    // Submit edited post
    document.getElementById('edit-post-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const postId = event.target.getAttribute('data-id');  // Assuming post ID is set as a data attribute on the form
        const newTitle = document.getElementById('edit-post-title').value;
        const newContent = document.getElementById('edit-post-content').value;

        const response = await fetch(`/api/posts/edit/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle, content: newContent })
        });

        if (response.ok) {
            location.reload();
        } else {
            // Handle error
        }
    });
});
