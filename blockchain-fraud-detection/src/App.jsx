import { useState } from "react";
import "./App.css";

function App() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const checkTransaction = () => {
    if (!sender || !receiver || !amount) {
      alert("Please fill all the fields");
      return;
    }

    // Temporary fraud detection logic
    // Later this will be replaced by the Flask backend
    if (Number(amount) > 50000) {
      setResult({
        status: "SUSPICIOUS",
        reason: "Transaction amount exceeds the security threshold.",
      });
    } else {
      setResult({
        status: "NORMAL",
        reason: "Transaction appears to be normal.",
      });
    }
  };

  return (
    <div className="app">
      <div className="navbar">
        <h2>SecureBank</h2>
        <span>Blockchain Fraud Detection</span>
      </div>

      <div className="main">
        <div className="card">
          <h1>Transaction Verification</h1>
          <p className="description">
            Verify a banking transaction using our fraud detection system.
          </p>

          <label>Sender Account</label>
          <input
            type="text"
            placeholder="Enter sender account"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />

          <label>Receiver Account</label>
          <input
            type="text"
            placeholder="Enter receiver account"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />

          <label>Transaction Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button onClick={checkTransaction}>
            CHECK TRANSACTION
          </button>

          {result && (
            <div
              className={
                result.status === "SUSPICIOUS"
                  ? "result suspicious"
                  : "result normal"
              }
            >
              <h2>
                {result.status === "SUSPICIOUS"
                  ? "⚠ Suspicious Transaction"
                  : "✓ Normal Transaction"}
              </h2>

              <p>
                <strong>Status:</strong> {result.status}
              </p>

              <p>
                <strong>Reason:</strong> {result.reason}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;