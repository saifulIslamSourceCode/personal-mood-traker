import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import WeeklyMoodChart from "./barchart";
import "./dashboard.css";

export default class Dashboard extends Component {
  state = { transactions: [] };

  componentDidMount() {
    TransactionDataService.getAll()
      .then((res) => this.setState({ transactions: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { transactions } = this.state;

    return (
      <div className="dashboard-wrapper">
        <h3 className="text-center my-4">Weekly Mood Summary</h3>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <WeeklyMoodChart transactions={transactions} />
        </div>
      </div>
    );
  }
}
