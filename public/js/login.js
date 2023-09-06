// document.addEventListener('DOMContentLoaded', () => {
//   const loginForm = document.querySelector('.login-form');
//   const signupForm = document.querySelector('.signup-form');

  const loginFormHandler = async (event) => {
      event.preventDefault();

      const username = document.querySelector('#username-login').value.trim();
      const password = document.querySelector('#password-login').value.trim();

      if (username && password) {
          const response = await fetch('/login', {
              method: 'POST',
              body: JSON.stringify({ username, password }),
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
              document.location.replace('/dashboard');
          } else {
              alert(response.statusText);
          }
      }
  };

  const signupFormHandler = async (event) => {
      event.preventDefault();

      const username = document.querySelector('#username-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();

      if (username && password) {
          const response = await fetch('/signup', {
              method: 'POST',
              body: JSON.stringify({ username, password }),
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
              document.location.replace('/dashboard');
          } else {
              alert(response.statusText);
          }
      }
  };

//   loginForm.addEventListener('submit', loginFormHandler);
//   signupForm.addEventListener('submit', signupFormHandler);

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


// const loginFormHandler = async (event) => {
//   event.preventDefault();

//     const username = document.querySelector('#username-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();

//     if (username && password) {
//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             body: JSON.stringify({ username, password }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.replace('/dashboard');
//         } else {
//             alert(response.statusText);
//         }
//     }
// };

// const signupFormHandler = async (event) => {
//   event.preventDefault();

//   const username = document.querySelector('#username-signup').value.trim();
//   const password = document.querySelector('#password-signup').value.trim();

//   if (username && password) {
//       const response = await fetch('/api/users/signup', {
//           method: 'POST',
//           body: JSON.stringify({ username, password }),
//           headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.ok) {
//           document.location.replace('/dashboard');
//       } else {
//           alert(response.statusText);
//       }
//   }
// };

// document
// .querySelector('.login-form')
// .addEventListener('submit', loginFormHandler);

// document
// .querySelector('.signup-form')
// .addEventListener('submit', signupFormHandler);
