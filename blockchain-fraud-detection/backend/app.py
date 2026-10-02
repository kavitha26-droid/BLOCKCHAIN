from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "BlockShield Backend is running!"
    })


@app.route("/api/analyze", methods=["POST"])
def analyze_transaction():

    data = request.get_json()

    sender = data.get("sender")
    receiver = data.get("receiver")
    amount = float(data.get("amount", 0))

    location = data.get("location", "")
    recent_transactions = int(data.get("recent_transactions", 0))
    failed_attempts = int(data.get("failed_attempts", 0))
    transaction_type = data.get("transaction_type", "Online Transfer")

    risk_score = 0
    reasons = []

    # Rule 1: High transaction amount
    if amount > 50000:
        risk_score += 30
        reasons.append("Unusually high transaction amount")

    # Rule 2: Too many recent transactions
    if recent_transactions > 5:
        risk_score += 25
        reasons.append("Too many recent transactions")

    # Rule 3: Unusual location
    if location.lower() in ["unknown", "unusual", "new"]:
        risk_score += 20
        reasons.append("Unusual transaction location")

    # Rule 4: Unusual transaction time
    current_hour = datetime.now().hour

    if current_hour >= 0 and current_hour < 5:
        risk_score += 15
        reasons.append("Transaction made at unusual time")

    # Rule 5: Multiple failed attempts
    if failed_attempts > 1:
        risk_score += 10
        reasons.append("Multiple failed transaction attempts")

    # Rule 6: Unusual transaction type
    if transaction_type.lower() in [
        "unknown",
        "unusual",
        "high-risk"
    ]:
        risk_score += 10
        reasons.append("Unusual transaction type")

    # Maximum score = 110, so cap it at 100
    risk_score = min(risk_score, 100)

    # Determine final status
    if risk_score >= 60:
        status = "FRAUD"

    elif risk_score >= 30:
        status = "SUSPICIOUS"

    else:
        status = "NORMAL"

    return jsonify({
        "sender": sender,
        "receiver": receiver,
        "amount": amount,
        "risk": risk_score,
        "status": status,
        "reasons": reasons
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)