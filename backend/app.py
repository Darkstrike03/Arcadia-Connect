from flask import Flask, jsonify, request
import uuid

app = Flask(__name__)

# Storage for meetings (temporary in-memory storage)
meetings = {}

@app.route('/')
def home():
    return "Arcadia Connect Backend is Running!"

@app.route('/new-meeting', methods=['GET'])
def new_meeting():
    # Generate a unique meeting ID
    meeting_id = str(uuid.uuid4())[:8]
    meeting_link = f"https://arcadia-connect-production.up.railway.app/meet/{meeting_id}"
    
    # Store the meeting ID (for validation purposes)
    meetings[meeting_id] = {"participants": []}
    
    return jsonify({"link": meeting_link, "id": meeting_id})

@app.route('/meet/<meeting_id>', methods=['GET'])
def join_meeting(meeting_id):
    # Check if the meeting exists
    if meeting_id in meetings:
        return jsonify({"status": "success", "message": f"Welcome to meeting {meeting_id}!"})
    else:
        return jsonify({"status": "error", "message": "Meeting not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
