document.addEventListener("DOMContentLoaded", function() {
    const createNewPostButton = document.querySelector('#create-new-post-button');
    const newPostForm = document.querySelector('#new-post-form');

    // Show/hide the new post form when the button is clicked
    createNewPostButton.addEventListener('click', () => {
        newPostForm.classList.toggle('hidden');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('create-post-form');
    
    if (createPostForm) {
      createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-contents').value; // Use "content" instead of "contents"
        
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ title, content }), // Use "content" instead of "contents"
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
          window.location.reload(); // Reload the page to show the updated dashboard
        } else {
          alert('Failed to create post');
        }
      });
    }
  });
  
  