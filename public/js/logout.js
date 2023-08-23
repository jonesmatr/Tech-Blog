const logout = async () => {
  // TODO: Add a comment describing the functionality of this expression
  // Sends a POST request to the '/api/users/logout' endpoint.
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // TODO: Add a comment describing the functionality of this statement
    // Redirects the user to the login page if the logout was successful.
    document.location.replace('/login');
  } else {
    // Displays an alert if the logout failed.
    alert('Failed to log out');
  }
};

// Adds an event listener to the click event of the '#logout' element, triggering the logout function when clicked.
document.querySelector('#logout').addEventListener('click', logout);
