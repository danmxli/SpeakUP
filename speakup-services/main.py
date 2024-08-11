import os
import argparse
import pathlib
from flask import Flask, jsonify, request
from flask_cors import CORS
from speech.evaluate import collect_metrics

app = Flask(__name__)

CORS(app)

@app.route('/api/v1/evaluate-speech/', methods=["POST"])
def evaluate_speech():
    if 'file_binary' not in request.files:
        return jsonify({"message": "No file_binary in request body"}), 400

    file = request.files['file_binary']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    file_path = os.path.join('speech', file.filename)
    file.save(file_path)

    # Perform the analysis
    p = os.path.abspath("./speech")
    res = collect_metrics(file.filename, p)

    os.remove(file_path)
    return jsonify(res)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run Flask application.')
    parser.add_argument('--debug', action='store_true',
                        help='Run the server in debug mode')
    args = parser.parse_args()

    port = int(os.getenv("PORT", default=8080))

    app.run(debug=args.debug, port=port)