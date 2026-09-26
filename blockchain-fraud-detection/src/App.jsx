import { useState } from "react";
import "./App.css";

const initialTransactions = [
  {
    id: "TXN-10482",
    sender: "AC7842••91",
    receiver: "AC2198••42",
    amount: "₹8,450",
    risk: 12,
    status: "NORMAL",
    hash: "0x7af2...91cd",
    time: "2 min ago",
  },
  {
    id: "TXN-10481",
    sender: "AC5521••72",
    receiver: "AC8842••16",
    amount: "₹72,500",
    risk: 86,
    status: "SUSPICIOUS",
    hash: "0x91bc...a821",
    time: "8 min ago",
  },
  {
    id: "TXN-10480",
    sender: "AC1928••44",
    receiver: "AC6421••83",
    amount: "₹2,100",
    risk: 8,
    status: "NORMAL",
    hash: "0x42de...721a",
    time: "15 min ago",
  },
  {
    id: "TXN-10479",
    sender: "AC7281••30",
    receiver: "AC9214••55",
    amount: "₹1,25,000",
    risk: 94,
    status: "FRAUD",
    hash: "0xa821...f912",
    time: "24 min ago",
  },
  {
    id: "TXN-10478",
    sender: "AC4612••18",
    receiver: "AC3012••77",
    amount: "₹14,800",
    risk: 21,
    status: "NORMAL",
    hash: "0x612c...8a91",
    time: "31 min ago",
  },
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [transactions, setTransactions] = useState(initialTransactions);

  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    amount: "",
    type: "Online Transfer",
  });

  const [result, setResult] = useState(null);

  const navigate = (name) => {
    setPage(name);
  };

  const analyzeTransaction = () => {
    const amount = Number(form.amount);

    if (!form.sender || !form.receiver || !form.amount) {
      alert("Please fill all transaction details.");
      return;
    }

    let risk;
    let status;
    let reason;

    if (amount >= 100000) {
      risk = 94;
      status = "FRAUD";
      reason = "Transaction amount exceeds high-risk threshold.";
    } else if (amount >= 50000) {
      risk = 82;
      status = "SUSPICIOUS";
      reason = "Unusual transaction amount detected.";
    } else if (amount >= 20000) {
      risk = 46;
      status = "SUSPICIOUS";
      reason = "Transaction requires additional verification.";
    } else {
      risk = 12;
      status = "NORMAL";
      reason = "Transaction pattern appears normal.";
    }

    const newTransaction = {
      id: `TXN-${10483 + transactions.length}`,
      sender: form.sender,
      receiver: form.receiver,
      amount: `₹${amount.toLocaleString("en-IN")}`,
      risk,
      status,
      hash: "0x" + Math.random().toString(16).substring(2, 10) + "...a821",
      time: "Just now",
    };

    setResult({
      risk,
      status,
      reason,
      hash: newTransaction.hash,
    });

    setTransactions([newTransaction, ...transactions]);
  };

  const statusClass = (status) => {
    return status.toLowerCase();
  };

  const renderDashboard = () => (
    <>
      <PageHeader
        title="Security Dashboard"
        subtitle="Real-time banking fraud detection and blockchain monitoring"
      />

      <div className="stats-grid">
        <StatCard title="Total Transactions" value="12,480" change="+8.2%" icon="↗" />
        <StatCard title="Suspicious" value="327" change="+2.4%" icon="!" warning />
        <StatCard title="Detection Rate" value="97.4%" change="+1.8%" icon="✓" />
        <StatCard title="Blockchain Blocks" value="2,841" change="+124" icon="▣" />
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-title">
            <div>
              <h3>Transaction Activity</h3>
              <span>Last 7 days</span>
            </div>
            <button className="small-btn">7 Days ▾</button>
          </div>

          <div className="chart">
            {[55, 70, 48, 82, 64, 91, 76, 88, 68, 95, 79, 86].map(
              (height, index) => (
                <div className="bar-wrap" key={index}>
                  <div
                    className="bar"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              )
            )}
          </div>

          <div className="chart-labels">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </section>

        <section className="panel">
          <div className="panel-title">
            <div>
              <h3>Risk Distribution</h3>
              <span>Transaction classification</span>
            </div>
          </div>

          <div className="risk-circle">
            <div>
              <strong>78%</strong>
              <span>Normal</span>
            </div>
          </div>

          <div className="risk-list">
            <RiskRow label="Normal" value="78%" type="normal" />
            <RiskRow label="Suspicious" value="16%" type="suspicious" />
            <RiskRow label="Fraud" value="6%" type="fraud" />
          </div>
        </section>
      </div>

      <TransactionTable transactions={transactions.slice(0, 5)} />
    </>
  );

  const renderVerify = () => (
    <>
      <PageHeader
        title="Verify Transaction"
        subtitle="Analyze a banking transaction for potential fraud"
      />

      <div className="verify-grid">
        <section className="panel form-panel">
          <div className="section-heading">
            <span className="section-icon">⌁</span>
            <div>
              <h3>Transaction Details</h3>
              <p>Enter transaction information</p>
            </div>
          </div>

          <label>Sender Account</label>
          <input
            placeholder="e.g. AC784291"
            value={form.sender}
            onChange={(e) =>
              setForm({ ...form, sender: e.target.value })
            }
          />

          <label>Receiver Account</label>
          <input
            placeholder="e.g. AC219842"
            value={form.receiver}
            onChange={(e) =>
              setForm({ ...form, receiver: e.target.value })
            }
          />

          <label>Transaction Amount</label>
          <div className="amount-input">
            <span>₹</span>
            <input
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />
          </div>

          <label>Transaction Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option>Online Transfer</option>
            <option>UPI Payment</option>
            <option>Bank Transfer</option>
            <option>Card Payment</option>
          </select>

          <button className="analyze-btn" onClick={analyzeTransaction}>
            ANALYZE TRANSACTION
            <span>→</span>
          </button>
        </section>

        <section className="panel result-panel">
          {!result ? (
            <div className="empty-result">
              <div className="shield-large">⬡</div>
              <h3>Awaiting Analysis</h3>
              <p>
                Submit transaction details to generate a fraud risk
                assessment.
              </p>
            </div>
          ) : (
            <>
              <div className="result-top">
                <div>
                  <span className="eyebrow">ANALYSIS RESULT</span>
                  <h2>{result.status}</h2>
                </div>
                <div className={`risk-score ${statusClass(result.status)}`}>
                  {result.risk}
                </div>
              </div>

              <div className="result-details">
                <div>
                  <span>Risk Score</span>
                  <strong>{result.risk}/100</strong>
                </div>
                <div>
                  <span>Decision</span>
                  <strong className={statusClass(result.status)}>
                    {result.status}
                  </strong>
                </div>
              </div>

              <div className="reason-box">
                <span>Detection Reason</span>
                <p>{result.reason}</p>
              </div>

              <div className="hash-box">
                <span>Blockchain Hash</span>
                <code>{result.hash}</code>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );

  const renderAnalytics = () => (
    <>
      <PageHeader
        title="Fraud Analytics"
        subtitle="Monitor fraud patterns and detection performance"
      />

      <div className="stats-grid">
        <StatCard title="Fraud Attempts" value="184" change="-12.4%" icon="!" />
        <StatCard title="Blocked" value="163" change="+6.1%" icon="⊘" />
        <StatCard title="False Positives" value="2.6%" change="-0.8%" icon="⌁" />
        <StatCard title="Avg. Risk Score" value="28.7" change="-4.2%" icon="◈" />
      </div>

      <div className="analytics-grid">
        <section className="panel">
          <div className="panel-title">
            <div>
              <h3>Risk Analysis</h3>
              <span>Current transaction distribution</span>
            </div>
          </div>

          <div className="horizontal-bars">
            <AnalyticsBar label="Low Risk" value="78%" width="78%" />
            <AnalyticsBar label="Medium Risk" value="16%" width="16%" />
            <AnalyticsBar label="High Risk" value="6%" width="6%" />
          </div>
        </section>

        <section className="panel detection-card">
          <span className="eyebrow">DETECTION ENGINE</span>
          <h2>97.4%</h2>
          <p>Overall fraud detection rate</p>

          <div className="progress">
            <div style={{ width: "97.4%" }}></div>
          </div>

          <div className="engine-points">
            <span>✓ Rule-based analysis</span>
            <span>✓ Risk scoring</span>
            <span>✓ Pattern verification</span>
          </div>
        </section>
      </div>
    </>
  );

  const renderBlockchain = () => (
    <>
      <PageHeader
        title="Blockchain Ledger"
        subtitle="Immutable transaction records secured by blockchain"
      />

      <div className="blockchain-banner">
        <div className="chain-icon">⬡</div>
        <div>
          <span>NETWORK STATUS</span>
          <h3>Ganache Local Ethereum Network</h3>
        </div>
        <div className="online">
          <i></i> Connected
        </div>
      </div>

      <div className="block-grid">
        {[
          ["Block Height", "2,841"],
          ["Transactions", "12,480"],
          ["Network", "Ganache"],
          ["Contract", "0x8a21...f291"],
        ].map(([label, value]) => (
          <div className="block-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <TransactionTable transactions={transactions} blockchain />
    </>
  );

  const renderAlerts = () => (
    <>
      <PageHeader
        title="Security Alerts"
        subtitle="Recent fraud detection events requiring attention"
      />

      <div className="alerts">
        <Alert
          type="fraud"
          title="High-Risk Transaction Blocked"
          text="Transaction TXN-10479 exceeded the high-risk threshold."
          time="24 minutes ago"
        />
        <Alert
          type="suspicious"
          title="Unusual Transaction Detected"
          text="Large transfer detected from account AC5521••72."
          time="8 minutes ago"
        />
        <Alert
          type="normal"
          title="Blockchain Verification Complete"
          text="Transaction TXN-10482 successfully recorded on-chain."
          time="2 minutes ago"
        />
      </div>
    </>
  );

  const renderSystem = () => (
    <>
      <PageHeader
        title="System Status"
        subtitle="Monitor the BlockShield application infrastructure"
      />

      <div className="system-grid">
        {[
          ["React Frontend", "Application interface"],
          ["Flask Backend", "API services"],
          ["Fraud Engine", "Transaction analysis"],
          ["Smart Contract", "Blockchain logic"],
          ["Ganache Network", "Ethereum test network"],
          ["Blockchain Ledger", "Immutable records"],
        ].map(([name, description]) => (
          <div className="system-card" key={name}>
            <div className="system-dot"></div>
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <strong>ONLINE</strong>
          </div>
        ))}
      </div>

      <section className="panel architecture">
        <div className="panel-title">
          <div>
            <h3>BlockShield Architecture</h3>
            <span>End-to-end transaction security flow</span>
          </div>
        </div>

        <div className="flow">
          <FlowItem title="React" text="Frontend" />
          <b>→</b>
          <FlowItem title="Flask" text="Backend API" />
          <b>→</b>
          <FlowItem title="Fraud Engine" text="Risk Analysis" />
          <b>→</b>
          <FlowItem title="Smart Contract" text="Verification" />
          <b>→</b>
          <FlowItem title="Ganache" text="Blockchain" />
        </div>
      </section>
    </>
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">⬡</div>
          <div>
            <h1>BlockShield</h1>
            <span>Banking Security</span>
          </div>
        </div>

        <div className="nav-section">
          <span className="nav-label">MAIN</span>

          <NavItem
            icon="⌂"
            text="Dashboard"
            active={page === "dashboard"}
            onClick={() => navigate("dashboard")}
          />

          <NavItem
            icon="✓"
            text="Verify Transaction"
            active={page === "verify"}
            onClick={() => navigate("verify")}
          />

          <NavItem
            icon="≡"
            text="Transactions"
            active={page === "transactions"}
            onClick={() => navigate("transactions")}
          />

          <NavItem
            icon="◔"
            text="Fraud Analytics"
            active={page === "analytics"}
            onClick={() => navigate("analytics")}
          />

          <NavItem
            icon="⬡"
            text="Blockchain Ledger"
            active={page === "blockchain"}
            onClick={() => navigate("blockchain")}
          />
        </div>

        <div className="nav-section">
          <span className="nav-label">SYSTEM</span>

          <NavItem
            icon="!"
            text="Security Alerts"
            active={page === "alerts"}
            onClick={() => navigate("alerts")}
          />

          <NavItem
            icon="⚙"
            text="System Status"
            active={page === "system"}
            onClick={() => navigate("system")}
          />
        </div>

        <div className="sidebar-bottom">
          <div className="network-status">
            <i></i>
            <div>
              <strong>System Secure</strong>
              <span>All services operational</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            BlockShield <span>/</span>{" "}
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </div>

          <div className="top-actions">
            <div className="top-status">
              <i></i> Blockchain Connected
            </div>
            <div className="profile">BS</div>
          </div>
        </header>

        <div className="content">
          {page === "dashboard" && renderDashboard()}
          {page === "verify" && renderVerify()}

          {page === "transactions" && (
            <>
              <PageHeader
                title="Transactions"
                subtitle="Complete transaction monitoring history"
              />
              <TransactionTable transactions={transactions} />
            </>
          )}

          {page === "analytics" && renderAnalytics()}
          {page === "blockchain" && renderBlockchain()}
          {page === "alerts" && renderAlerts()}
          {page === "system" && renderSystem()}
        </div>
      </main>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="live-badge">
        <i></i> LIVE MONITORING
      </div>
    </div>
  );
}

function NavItem({ icon, text, active, onClick }) {
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <span>{icon}</span>
      {text}
    </button>
  );
}

function StatCard({ title, value, change, icon, warning }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <div className={`stat-icon ${warning ? "warning" : ""}`}>{icon}</div>
      </div>

      <strong>{value}</strong>
      <small>{change} <span>vs last period</span></small>
    </div>
  );
}

function RiskRow({ label, value, type }) {
  return (
    <div className="risk-row">
      <span>
        <i className={type}></i>
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  );
}

function AnalyticsBar({ label, value, width }) {
  return (
    <div className="analytics-bar">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="bar-background">
        <div style={{ width }}></div>
      </div>
    </div>
  );
}

function TransactionTable({ transactions, blockchain = false }) {
  return (
    <section className="panel table-panel">
      <div className="panel-title">
        <div>
          <h3>{blockchain ? "Blockchain Records" : "Recent Transactions"}</h3>
          <span>
            {blockchain
              ? "Immutable transaction records"
              : "Latest transaction activity"}
          </span>
        </div>

        <button className="small-btn">View All →</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Hash</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>
                  <strong className="tx-id">{tx.id}</strong>
                  <small>{tx.time}</small>
                </td>
                <td>{tx.sender}</td>
                <td>{tx.receiver}</td>
                <td>
                  <strong>{tx.amount}</strong>
                </td>
                <td>
                  <span className={`risk-number ${statusClass(tx.status)}`}>
                    {tx.risk}
                  </span>
                </td>
                <td>
                  <span className={`status ${statusClass(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td>
                  <code>{tx.hash}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Alert({ type, title, text, time }) {
  return (
    <div className={`alert-card ${type}`}>
      <div className="alert-icon">
        {type === "fraud" ? "!" : type === "suspicious" ? "◉" : "✓"}
      </div>

      <div className="alert-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <span>{time}</span>
      </div>

      <button>View →</button>
    </div>
  );
}

function FlowItem({ title, text }) {
  return (
    <div className="flow-item">
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}

export default App;
