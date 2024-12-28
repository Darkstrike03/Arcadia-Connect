from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/new-meeting")
def new_meeting():
    import uuid
    meeting_id = str(uuid.uuid4())  # Generate a unique meeting ID
    meeting_link = f"https://arcadia-connect.vercel.app/meeting/{meeting_id}"
    return jsonify({"link": meeting_link})

if __name__ == "__main__":
    app.run(debug=True)
