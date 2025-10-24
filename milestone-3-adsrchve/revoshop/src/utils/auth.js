// src/utils/auth.js

export function isLoggedIn() {
  // cek token di localStorage
  return !!localStorage.getItem('token');
}

export async function login(email, password) {
  // simulasi login API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password123') {
        localStorage.setItem('token', 'FAKE_TOKEN');
        resolve({ token: 'FAKE_TOKEN' });
      } else {
        reject(new Error('login failed'));
      }
    }, 200);
  });
}
