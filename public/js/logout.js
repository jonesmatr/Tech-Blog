const logout = async () => {
  const response = await fetch('/api/logout', { // Use the correct route here
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    // Displays an alert if the logout failed.
    alert('Failed to log out');
  }
};

// Adds an event listener to the click event of the '#logout' element, triggering the logout function when clicked.
document.querySelector('#logout').addEventListener('click', logout);
