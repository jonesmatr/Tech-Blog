document.addEventListener("DOMContentLoaded", function () {

    // Check if user is logged in
    const isLoggedIn = document.body.getAttribute('data-logged-in');
    const commentForm = document.querySelector('#comment-form'); // Assume the form has an id="comment-form"
    
    if (!isLoggedIn) {
        // Hide comment form if user is not logged in
        if (commentForm) {
            commentForm.style.display = 'none';
        }
    } else {
        // Show comment form if user is logged in
        if (commentForm) {
            commentForm.style.display = 'block';
        }
    }
    
    // Show/hide new post form
    const createNewPostButton = document.querySelector('#create-new-post-button');
    const newPostForm = document.querySelector('#new-post-form');
    createNewPostButton.addEventListener('click', () => {
        newPostForm.classList.toggle('hidden');
    });

    // Delete post
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');
            const response = await fetch(`/api/post/delete/${id}`, {
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
            event.preventDefault(); // Prevent default behavior of clicking an anchor tag
            console.log("Edit button clicked");
            const id = event.target.getAttribute('data-id');

            // Fetch existing post data
            const response = await fetch(`/api/post/${id}`);
            if (!response.ok) {
                // Handle error
                return;
            }
            const postData = await response.json();

            // Create and populate form
            const formHtml = `
                <form id="edit-post-form" data-id="${id}">
                    <label for="edit-post-title">Title:</label>
                    <input type="text" id="edit-post-title" value="${postData.title}" required>

                    <label for="edit-post-content">Content:</label>
                    <textarea id="edit-post-content" required>${postData.content}</textarea>

                    <button type="submit">Update Post</button>
                </form>
            `;

            // Insert form into DOM
            document.getElementById('edit-form-container').innerHTML = formHtml;

            // Attach event listener for this new form
            const editForm = document.getElementById('edit-post-form');
            if (editForm) {
                editForm.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const id = editForm.getAttribute('data-id');
                    const title = document.getElementById('edit-post-title').value.trim();
                    const content = document.getElementById('edit-post-content').value.trim();

                    const response = await fetch(`/api/post/edit/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title, content })
                    });

                    if (response.ok) {
                        document.location.replace('/dashboard');
                    } else {
                        alert('Failed to update post');
                    }
                });
            }
        });
        });
    });
