from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import jwt
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS if needed

# Secret key for JWT (store this securely in production)
SECRET_KEY = 'your-secret-key'

# In-memory user store (replace with a database for production)
users = []

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if not username or not password or not role:
        return jsonify({'message': 'Username, password, and role are required.'}), 400

    # Check if the user already exists
    if any(user['username'] == username for user in users):
        return jsonify({'message': 'User already exists.'}), 400

    # Hash the password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create new user and add to the in-memory store
    new_user = {
        'id': len(users) + 1,
        'username': username,
        'password': hashed_pw,  # stored as bytes
        'role': role
    }
    users.append(new_user)

    # Generate a JWT token valid for 1 hour
    token = jwt.encode({
        'id': new_user['id'],
        'role': new_user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')

    return jsonify({'token': token, 'role': new_user['role']}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required.'}), 400

    # Find the user by username
    user = next((u for u in users if u['username'] == username), None)
    if not user:
        return jsonify({'message': 'Invalid credentials.'}), 401

    # Check the password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'message': 'Invalid credentials.'}), 401

    # Generate a JWT token valid for 1 hour
    token = jwt.encode({
        'id': user['id'],
        'role': user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')

    return jsonify({'token': token, 'role': user['role']}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
