import os
import argparse
import pathlib
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# tmp directory for uploaded files
UPLOAD_FOLDER = './tmp'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/', methods=["GET"])
def read_root():
    return jsonify({"message": "root route reached."})


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run Flask application.')
    parser.add_argument('--debug', action='store_true',
                        help='Run the server in debug mode')
    args = parser.parse_args()

    port = int(os.getenv("PORT", default=8080))

    app.run(debug=args.debug, port=port)