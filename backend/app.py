import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from executor import execute_code

app = Flask(__name__)
CORS(app)

CURRICULUM_FILE = os.path.join(os.path.dirname(__file__), 'curriculum.json')

def load_curriculum():
    if not os.path.exists(CURRICULUM_FILE):
        return {}
    with open(CURRICULUM_FILE, 'r') as f:
        return json.load(f)

@app.route('/api/curriculum', methods=['GET'])
def get_curriculum():
    data = load_curriculum()
    return jsonify(data)

@app.route('/api/run', methods=['POST'])
def run_code():
    data = request.json
    code = data.get('code', '')
    
    if not code:
        return jsonify({"output": "", "error": "No code provided"}), 400

    result = execute_code(code)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
