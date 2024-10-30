const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Функция для чтения пользователей из файла
const readUsersFromFile = () => {
  const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8');
  return JSON.parse(data);
};

// Функция для записи пользователей в файл
const writeUsersToFile = (users) => {
  fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
};

// Регистрация пользователя
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  users.push({ username, password });
  writeUsersToFile(users);
  res.status(201).json({ message: 'Registration successful' });
});

// Авторизация пользователя
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
