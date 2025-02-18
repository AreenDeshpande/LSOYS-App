import os
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app) 
bcrypt = Bcrypt(app)

def signup():
    data=request.json
    username=data.get("username")
    password=data.get("password")
    role=data.get("role")

    if not username or not password or not role :
        return jsonify({"error":"Missing data"}),400
    
    if user_collection.find_one({"username":username}):
        return jsonify({"error":"Username already exists"}),400
    