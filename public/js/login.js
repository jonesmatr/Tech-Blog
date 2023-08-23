const loginFormHandler = async (event) => {
  // TODO: Add a comment describing the functionality of this statement
  // Prevents the default form submission behavior, which allows us to handle the form submission manually.
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
  // Retrieves the values entered in the email and password fields and trims any leading/trailing whitespace.
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // TODO: Add a comment describing the functionality of this expression
    // Sends a POST request to the '/api/users/login' endpoint with the provided email and password as JSON data.
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirects the user to the homepage if the login was successful.
      document.location.replace('/');
    } else {
      // Displays an alert if the login failed.
      alert('Failed to log in');
    }
  }
};

// Adds an event listener to the submit event of the '.login-form' element, triggering the loginFormHandler function when the form is submitted.
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
