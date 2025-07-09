from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["webhookDB"]
events_collection = db["events"]

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    event_type = request.headers.get('X-GitHub-Event')
    try:
        # Extract basic info
        author = data['pusher']['name'] if 'pusher' in data else data['sender']['login']
        timestamp = data['head_commit']['timestamp'] if 'head_commit' in data else datetime.utcnow().isoformat()

        # Prepare event
        if event_type == "push":
            branch = data['ref'].split('/')[-1]
            message = f"{author} pushed to {branch} on {timestamp}"
        elif event_type == "pull_request":
            action = data['action']
            if action == "opened":
                from_branch = data['pull_request']['head']['ref']
                to_branch = data['pull_request']['base']['ref']
                message = f"{author} submitted a pull request from {from_branch} to {to_branch} on {timestamp}"
            elif action == "closed" and data['pull_request'].get('merged', False):
                from_branch = data['pull_request']['head']['ref']
                to_branch = data['pull_request']['base']['ref']
                message = f"{author} merged branch {from_branch} to {to_branch} on {timestamp}"
            else:
                return "Ignored", 200
        else:
            return "Event not handled", 200

        # Insert into DB
        print("Inserting into MongoDB:", message, timestamp)
        events_collection.insert_one({
            "message": message,
            "timestamp": timestamp
        })
        print("Insert complete")

        return "Webhook received and processed", 200
    except Exception as e:
        return str(e), 500

@app.route('/events', methods=['GET'])
def get_events():
    events = list(events_collection.find({}, {'_id': 0}).sort("timestamp", -1))
    return jsonify(events)

if __name__ == '__main__':
    app.run(port=5000)