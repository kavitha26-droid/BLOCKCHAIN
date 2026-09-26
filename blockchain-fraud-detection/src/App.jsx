import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const transactions = [
    {
      id: "TXN-001",
      sender: "ACC-102938",
      receiver: "ACC-583920",
      amount: "₹12,000",
      risk: "Low",
      status: "Normal",
    },
    {
      id: "TXN-002",
      sender: "ACC-938421",
      receiver: "ACC-291830",
      amount: "₹85,000",
      risk: "High",
      status: "Suspicious",
    },
    {
      id: "TXN-003",
      sender: "ACC-421782",
      receiver: "ACC-772190",
      amount: "₹8,500",
      risk: "Low",
      status: "Normal",
    },
    {
      id: "TXN-004",
      sender: "ACC-673829",
      receiver: "ACC-129834",
      amount: "₹62,000",
      risk: "Medium",
      status: "Suspicious",
    },
  ];

  const checkTransaction = () => {
    if (!sender || !receiver || !amount) {
      alert("Please fill all the fields.");
      return;
    }

    const value = Number(amount);

    if (value > 50000) {
      setResult({
        status: "SUSPICIOUS",
        score: 82,
        reason: "Transaction amount exceeds the normal security threshold.",
        hash: "0x8f72c91a...d821",
      });
    } else {
      setResult({
        status: "NORMAL",
        score: 18,
        reason: "Transaction appears to follow normal transaction patterns.",
        hash: "0x3a91f72b...c291",
      });
    }
  };

  const renderDashboard = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Security Dashboard</h1>
          <p>Real-time banking transaction monitoring and fraud detection.</p>
        </div>
        <div className="system-online">
          <span></span> System Online
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">↔</div>
          <div>
            <p>Total Transactions</p>
            <h2>1,284</h2>
            <small>+12.5% this month</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">!</div>
          <div>
            <p>Suspicious</p>
            <h2>37</h2>
            <small>2.8% of transactions</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <p>Verified</p>
            <h2>1,247</h2>
            <small>Blockchain verified</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">◉</div>
          <div>
            <p>Detection Rate</p>
            <h2>94.8%</h2>
            <small>Fraud detection accuracy</small>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Transaction Activity</h3>
              <p>Weekly transaction volume</p>
            </div>
            <select>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>

          <div className="chart">
            <div className="chart-line"></div>
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Risk Distribution</h3>
              <p>Current transaction risk</p>
            </div>
          </div>

          <div className="risk-item">
            <div>
              <span>Low Risk</span>
              <strong>72%</strong>
            </div>
            <div className="progress">
              <div className="low-progress"></div>
            </div>
          </div>

          <div className="risk-item">
            <div>
              <span>Medium Risk</span>
              <strong>21%</strong>
            </div>
            <div className="progress">
              <div className="medium-progress"></div>
            </div>
          </div>

          <div className="risk-item">
            <div>
              <span>High Risk</span>
              <strong>7%</strong>
            </div>
            <div className="progress">
              <div className="high-progress"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Recent Transactions</h3>
            <p>Latest monitored banking activity</p>
          </div>
          <button
            className="text-button"
            onClick={() => setPage("transactions")}
          >
            View All →
          </button>
        </div>

        <TransactionTable />
      </div>
    </>
  );

  const renderVerify = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Transaction Verification</h1>
          <p>Analyze a banking transaction for potential fraud.</p>
        </div>
      </div>

      <div className="verify-layout">
        <div className="panel verify-card">
          <h3>Transaction Details</h3>
          <p className="panel-description">
            Enter the transaction details to perform a security analysis.
          </p>

          <label>Sender Account</label>
          <input
            type="text"
            placeholder="e.g. ACC-102938"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />

          <label>Receiver Account</label>
          <input
            type="text"
            placeholder="e.g. ACC-583920"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />

          <label>Transaction Amount</label>
          <div className="amount-input">
            <span>₹</span>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <label>Transaction Type</label>
          <select className="full-select">
            <option>Bank Transfer</option>
            <option>Online Payment</option>
            <option>Card Payment</option>
            <option>UPI Transfer</option>
          </select>

          <button className="primary-button" onClick={checkTransaction}>
            VERIFY TRANSACTION
          </button>
        </div>

        <div className="panel analysis-card">
          {!result ? (
            <div className="empty-analysis">
              <div className="shield">◈</div>
              <h3>Ready for Analysis</h3>
              <p>
                Submit a transaction to view fraud risk and blockchain
                verification details.
              </p>
            </div>
          ) : (
            <div>
              <div
                className={`result-header ${
                  result.status === "SUSPICIOUS" ? "danger" : "safe"
                }`}
              >
                <div className="result-icon">
                  {result.status === "SUSPICIOUS" ? "!" : "✓"}
                </div>
                <div>
                  <p>Transaction Status</p>
                  <h2>{result.status}</h2>
                </div>
              </div>

              <div className="risk-score">
                <div className="score-circle">
                  <strong>{result.score}</strong>
                  <span>/100</span>
                </div>

                <div>
                  <h3>Risk Score</h3>
                  <p>
                    {result.score > 50
                      ? "High risk transaction detected."
                      : "Low risk transaction detected."}
                  </p>
                </div>
              </div>

              <div className="reason-box">
                <strong>Analysis</strong>
                <p>{result.reason}</p>
              </div>

              <div className="blockchain-box">
                <div>
                  <span>Blockchain Status</span>
                  <strong>✓ Recorded</strong>
                </div>
                <div>
                  <span>Transaction Hash</span>
                  <strong>{result.hash}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderAnalytics = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Fraud Analytics</h1>
          <p>Monitor transaction patterns and security risks.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">₹</div>
          <div>
            <p>Transaction Volume</p>
            <h2>₹48.2L</h2>
            <small>Last 30 days</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">!</div>
          <div>
            <p>Fraud Attempts</p>
            <h2>37</h2>
            <small>Detected and flagged</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <p>Blocked</p>
            <h2>31</h2>
            <small>High-risk transactions</small>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="panel">
          <h3>Risk Analysis</h3>

          <div className="risk-analysis">
            <div className="analysis-row">
              <span>Amount Anomaly</span>
              <div className="analysis-bar">
                <div style={{ width: "85%" }}></div>
              </div>
              <strong>85%</strong>
            </div>

            <div className="analysis-row">
              <span>Unusual Activity</span>
              <div className="analysis-bar">
                <div style={{ width: "72%" }}></div>
              </div>
              <strong>72%</strong>
            </div>

            <div className="analysis-row">
              <span>Frequency Anomaly</span>
              <div className="analysis-bar">
                <div style={{ width: "48%" }}></div>
              </div>
              <strong>48%</strong>
            </div>

            <div className="analysis-row">
              <span>Account Behavior</span>
              <div className="analysis-bar">
                <div style={{ width: "32%" }}></div>
              </div>
              <strong>32%</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <h3>Detection Summary</h3>

          <div className="summary-circle">
            <strong>94.8%</strong>
            <span>Detection Rate</span>
          </div>

          <div className="summary-details">
            <div>
              <span>Normal</span>
              <strong>1,247</strong>
            </div>
            <div>
              <span>Suspicious</span>
              <strong>37</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderBlockchain = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Blockchain Ledger</h1>
          <p>Immutable transaction records and hash verification.</p>
        </div>
        <div className="blockchain-status">● Blockchain Connected</div>
      </div>

      <div className="panel blockchain-detail">
        <div className="blockchain-heading">
          <div className="chain-icon">⛓</div>
          <div>
            <h2>Transaction Record</h2>
            <p>Verified blockchain entry</p>
          </div>
        </div>

        <div className="detail-grid">
          <div>
            <span>Transaction ID</span>
            <strong>TXN-2026-009821</strong>
          </div>
          <div>
            <span>Block Number</span>
            <strong>#1842</strong>
          </div>
          <div>
            <span>Sender</span>
            <strong>0x7A3...82F</strong>
          </div>
          <div>
            <span>Receiver</span>
            <strong>0x92B...19C</strong>
          </div>
          <div>
            <span>Amount</span>
            <strong>₹75,000</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className="danger-text">Suspicious</strong>
          </div>
          <div className="full-detail">
            <span>Transaction Hash</span>
            <strong className="hash">
              0x8f72c91a7b21d9034a8d...d821
            </strong>
          </div>
          <div>
            <span>Timestamp</span>
            <strong>26 Sep 2026, 01:24 PM</strong>
          </div>
        </div>

        <button className="primary-button verify-hash">
          VERIFY BLOCKCHAIN INTEGRITY
        </button>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <h3>Recent Blockchain Records</h3>
            <p>Latest transactions stored on the ledger.</p>
          </div>
        </div>

        <TransactionTable blockchain />
      </div>
    </>
  );

  const renderAlerts = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Security Alerts</h1>
          <p>Recent fraud and security events.</p>
        </div>
      </div>

      <div className="alerts">
        <div className="alert high">
          <div className="alert-icon">!</div>
          <div>
            <h3>High Risk Transaction</h3>
            <p>₹85,000 transaction detected from ACC-938421.</p>
            <small>2 minutes ago</small>
          </div>
          <span>HIGH</span>
        </div>

        <div className="alert medium">
          <div className="alert-icon">!</div>
          <div>
            <h3>Unusual Activity</h3>
            <p>Multiple transactions detected from ACC-102938.</p>
            <small>15 minutes ago</small>
          </div>
          <span>MEDIUM</span>
        </div>

        <div className="alert success">
          <div className="alert-icon">✓</div>
          <div>
            <h3>Transaction Verified</h3>
            <p>Blockchain integrity successfully confirmed.</p>
            <small>32 minutes ago</small>
          </div>
          <span>VERIFIED</span>
        </div>
      </div>
    </>
  );

  const renderSystem = () => (
    <>
      <div className="page-title">
        <div>
          <h1>System Status</h1>
          <p>Monitor all components of the fraud detection platform.</p>
        </div>
      </div>

      <div className="system-grid">
        {[
          ["React Frontend", "User interface and transaction dashboard"],
          ["Flask Backend", "Transaction processing API"],
          ["Fraud Detection Engine", "Transaction risk analysis"],
          ["Smart Contract", "Blockchain transaction recording"],
          ["Ganache Blockchain", "Local Ethereum network"],
          ["Database", "Transaction records and logs"],
        ].map(([name, description]) => (
          <div className="system-card" key={name}>
            <div className="service-icon">◉</div>
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <span className="online">ONLINE</span>
          </div>
        ))}
      </div>

      <div className="architecture panel">
        <h3>System Architecture</h3>

        <div className="architecture-flow">
          <div>USER</div>
          <span>↓</span>
          <div>REACT FRONTEND</div>
          <span>↓</span>
          <div>FLASK API</div>
          <span>↓</span>
          <div>FRAUD ENGINE</div>
          <span>↓</span>
          <div>SMART CONTRACT</div>
          <span>↓</span>
          <div>BLOCKCHAIN</div>
        </div>
      </div>
    </>
  );

  function TransactionTable({ blockchain = false }) {
    return (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Status</th>
              {blockchain && <th>Blockchain</th>}
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.sender}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.amount}</td>
                <td>
                  <span
                    className={`risk-badge ${transaction.risk.toLowerCase()}`}
                  >
                    {transaction.risk}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      transaction.status === "Normal" ? "normal" : "suspicious"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                {blockchain && <td className="verified">✓ Verified</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <h2>SecureBank</h2>
            <span>Sentinel</span>
          </div>
        </div>

        <div className="menu-label">MAIN MENU</div>

        <button
          className={page === "dashboard" ? "menu active" : "menu"}
          onClick={() => setPage("dashboard")}
        >
          <span>⌂</span> Dashboard
        </button>

        <button
          className={page === "verify" ? "menu active" : "menu"}
          onClick={() => setPage("verify")}
        >
          <span>↔</span> Verify Transaction
        </button>

        <button
          className={page === "transactions" ? "menu active" : "menu"}
          onClick={() => setPage("transactions")}
        >
          <span>▤</span> Transactions
        </button>

        <button
          className={page === "analytics" ? "menu active" : "menu"}
          onClick={() => setPage("analytics")}
        >
          <span>◒</span> Fraud Analytics
        </button>

        <div className="menu-label">BLOCKCHAIN</div>

        <button
          className={page === "blockchain" ? "menu active" : "menu"}
          onClick={() => setPage("blockchain")}
        >
          <span>⛓</span> Blockchain Ledger
        </button>

        <button
          className={page === "alerts" ? "menu active" : "menu"}
          onClick={() => setPage("alerts")}
        >
          <span>⚠</span> Security Alerts
          <b className="notification">3</b>
        </button>

        <div className="menu-label">SYSTEM</div>

        <button
          className={page === "system" ? "menu active" : "menu"}
          onClick={() => setPage("system")}
        >
          <span>⚙</span> System Status
        </button>

        <div className="sidebar-bottom">
          <div className="user-avatar">KB</div>
          <div>
            <strong>Bank Admin</strong>
            <small>Security Officer</small>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div className="breadcrumb">
            SecureBank <span>/</span>{" "}
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </div>

          <div className="top-actions">
            <div className="notification-icon">🔔</div>
            <div className="admin">
              <div className="mini-avatar">KB</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <section className="page-content">
          {page === "dashboard" && renderDashboard()}
          {page === "verify" && renderVerify()}
          {page === "transactions" && (
            <>
              <div className="page-title">
                <div>
                  <h1>Transactions</h1>
                  <p>Monitor and review all banking transactions.</p>
                </div>
              </div>

              <div className="panel">
                <TransactionTable />
              </div>
            </>
          )}
          {page === "analytics" && renderAnalytics()}
          {page === "blockchain" && renderBlockchain()}
          {page === "alerts" && renderAlerts()}
          {page === "system" && renderSystem()}
        </section>
      </main>
    </div>
  );
}

export default App;
