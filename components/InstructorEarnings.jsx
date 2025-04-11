import React, { useState, useEffect } from "react";
import "../styles/InstructorEarnings.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const InstructorEarnings = () => {
  const [earningsSummary, setEarningsSummary] = useState({
    totalEarnings: 45000,
    thisMonth: 9500,
    pending: 1200,
  });

  const [transactions, setTransactions] = useState([
    {
      id: "TXN001",
      course: "React for Beginners",
      amount: 499,
      date: "2024-04-01",
      status: "Paid",
    },
    {
      id: "TXN002",
      course: "Advanced JS",
      amount: 699,
      date: "2024-03-28",
      status: "Paid",
    },
    {
      id: "TXN003",
      course: "Python ML",
      amount: 899,
      date: "2024-03-20",
      status: "Pending",
    },
  ]);

  const [payouts, setPayouts] = useState([
    {
      payoutId: "PAYOUT001",
      amount: 5000,
      requestedOn: "2024-04-02",
      status: "Completed",
      paidOn: "2024-04-03",
    },
    {
      payoutId: "PAYOUT002",
      amount: 1200,
      requestedOn: "2024-04-07",
      status: "Pending",
      paidOn: null,
    },
  ]);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Earnings (₹)",
        data: [1000, 3000, 5000, 9500, 12000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#4bc0c0",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="earnings-container">
      <h2>💰 Instructor Earnings Dashboard</h2>

      {/* Summary Cards */}
      <div className="earnings-summary">
        <div className="summary-card">
          <h4>Total Earnings</h4>
          <p>₹{earningsSummary.totalEarnings.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h4>This Month</h4>
          <p>₹{earningsSummary.thisMonth}</p>
        </div>
        <div className="summary-card">
          <h4>Pending Payout</h4>
          <p>₹{earningsSummary.pending}</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="earnings-chart">
        <h3>📈 Earnings Trend</h3>
        <Line data={chartData} />
      </div>

      {/* Transactions Table */}
      <div className="earnings-table">
        <h3>📜 Transaction History</h3>
        <table>
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.id}</td>
                <td>{txn.course}</td>
                <td>₹{txn.amount}</td>
                <td>{txn.date}</td>
                <td>{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payouts Table */}
      <div className="payouts-table">
        <h3>🏦 Payout History</h3>
        <table>
          <thead>
            <tr>
              <th>Payout ID</th>
              <th>Amount</th>
              <th>Requested On</th>
              <th>Status</th>
              <th>Paid On</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout, index) => (
              <tr key={index}>
                <td>{payout.payoutId}</td>
                <td>₹{payout.amount}</td>
                <td>{payout.requestedOn}</td>
                <td>{payout.status}</td>
                <td>{payout.paidOn || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorEarnings;
