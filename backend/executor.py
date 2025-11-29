import subprocess
import sys

def execute_code(code, timeout=10):
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

def validate_exercise(code, test_cases, timeout=10):
    """
    Validates user code against test cases.
    Returns a dictionary with validation results.
    """
    try:
        # Execute the code
        result = subprocess.run(
            [sys.executable, "-c", code],
            capture_output=True,
            text=True,
            timeout=timeout
        )
        
        actual_output = result.stdout
        
        # If there's an error, return it
        if result.stderr:
            return {
                "success": False,
                "error": result.stderr,
                "message": "Your code has errors. Please fix them and try again.",
                "testResults": []
            }
        
        # Validate against test cases
        test_results = []
        all_passed = True
        
        for i, test_case in enumerate(test_cases):
            expected = test_case.get("expectedOutput", "")
            passed = actual_output == expected
            
            test_results.append({
                "testNumber": i + 1,
                "description": test_case.get("description", f"Test {i + 1}"),
                "passed": passed,
                "expected": expected,
                "actual": actual_output
            })
            
            if not passed:
                all_passed = False
        
        return {
            "success": all_passed,
            "message": "Great job! All tests passed! 🎉" if all_passed else "Some tests failed. Keep trying!",
            "testResults": test_results,
            "output": actual_output
        }
        
    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "error": "Code execution timed out. Check for infinite loops.",
            "message": "Execution timeout",
            "testResults": []
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "An error occurred during validation",
            "testResults": []
        }
