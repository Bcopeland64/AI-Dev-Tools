import subprocess
import sys

def execute_code(code, timeout=2):
    """
    Executes the provided Python code in a separate process.
    Returns a dictionary with 'output' and 'error'.
    """
    try:
        # Run the code in a subprocess
        result = subprocess.run(
            [sys.executable, "-c", code],
            capture_output=True,
            text=True,
            timeout=timeout
        )
        return {
            "output": result.stdout,
            "error": result.stderr
        }
    except subprocess.TimeoutExpired:
        return {
            "output": "",
            "error": "Error: Code execution timed out (infinite loop?)"
        }
    except Exception as e:
        return {
            "output": "",
            "error": f"System Error: {str(e)}"
        }
