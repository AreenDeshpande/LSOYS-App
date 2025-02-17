const express = require('express');
const jwt = require('jsonwebtoken'); // Install: npm install jsonwebtoken
const bcrypt = require('bcrypt'); // For password hashing (install: npm install bcrypt)

const app = express();
app.use(express.json());

// Sample user data (In a real app, you would get this from a database)
const users = [
    { id: 1, username: 'testuser', password: bcrypt.hashSync('password', 10) }, // Hash the password!
    // ... more users
];

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) { // Compare entered password with hash
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' }); // Replace with a strong secret

  res.json({ token });
});


// Example of a protected route (requires authentication)
app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: "This is a protected route!", userId: req.user.userId });
});

// Middleware for JWT authentication
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>

        jwt.verify(token, 'your-secret-key', (err, user) => { // Same secret as above
            if (err) {
                return res.sendStatus(403); // Or 401 Unauthorized
            }

            req.user = user; // Make user available in routes
            next();
        });
    } else {
        res.sendStatus(401); // No token provided
    }
}

// ... other routes

app.listen(5000, () => console.log('Server started on port 5000'));