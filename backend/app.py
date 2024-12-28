import os
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route("/new-meeting")
def new_meeting():
    import uuid
    meeting_id = str(uuid.uuid4())
    meeting_link = f"https://arcadia-connect.vercel.app/meeting/{meeting_id}"
    return jsonify({"link": meeting_link})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Get the port dynamically
    app.run(debug=True, host="0.0.0.0", port=port)
