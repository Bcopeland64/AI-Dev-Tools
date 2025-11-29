from flask import Flask, jsonify, request
from flask_cors import CORS
from executor import execute_code, validate_exercise

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

@app.route('/api/validate', methods=['POST'])
def validate_code():
    data = request.json
    code = data.get('code', '')
    test_cases = data.get('testCases', [])
    
    if not code:
        return jsonify({"success": False, "message": "No code provided"}), 400

    result = validate_exercise(code, test_cases)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000, threaded=True, use_reloader=False)
