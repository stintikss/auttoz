// document.getElementById('login-avt').addEventListener('click', function() {
//     // Получаем сохраненные значения из localStorage
//     const storedLogin = localStorage.getItem("login");
//     const storedPassword = localStorage.getItem("password");

//     // Получаем введенные пользователем значения
//     const LoginInput = document.getElementById('login-input').value;
//     const PasswordInput = document.getElementById('passwordd').value;

//     // Проверка логина и пароля
//     if (LoginInput === storedLogin && PasswordInput === storedPassword) {
//         window.location.href = 'home.html'
//     } else {
//         alert("Неверный логин или пароль");
//     }
// });



document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      document.getElementById('loginMessage').innerText = result.message;
    } catch (error) {
      console.error('Error:', error);
    }
  });
  