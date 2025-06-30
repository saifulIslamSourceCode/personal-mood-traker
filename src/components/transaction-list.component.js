import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import "./transaction-list.css"; // Import the CSS file

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTransaction = this.setActiveTransaction.bind(this);
    this.removeAllTransactions = this.removeAllTransactions.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.sortByCategory = this.sortByCategory.bind(this);
    this.deleteFirstRow = this.deleteFirstRow.bind(this);

    this.state = {
      transactions: [],
      currentTransaction: null,
      currentIndex: -1,
      searchTitle: "",
      categories: [
        { id: 1, name: "Salary" },
        { id: 2, name: "Groceries" },
        { id: 3, name: "Entertainment" }
      ],
      sortOrder: "asc", // Default sort order
      showFirstRow: true, // control display of hardcoded first row
    };
  }

  componentDidMount() {
    this.retrieveTransactions();
  }

  retrieveTransactions() {
    TransactionDataService.getAll()
      .then(response => {
        this.setState({
          transactions: response.data
        }, this.sortByCategory); // Sort by category after retrieving transactions
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  refreshList() {
    this.retrieveTransactions();
    this.setState({
      currentTransaction: null,
      currentIndex: -1
    });
  }

  setActiveTransaction(transaction, index) {
    this.setState({
      currentTransaction: transaction,
      currentIndex: index
    });
  }

  removeAllTransactions() {
    TransactionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTransaction: null,
      currentIndex: -1
    });

    TransactionDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getCategoryName(categoryId) {
    const category = this.state.categories.find(category => category.id === categoryId);
    return category ? category.name : "Unknown";
  }

  sortByCategory() {
    const { transactions, sortOrder } = this.state;
    const sortedTransactions = transactions.sort((a, b) => {
      const categoryA = this.getCategoryName(a.categoryId).toLowerCase();
      const categoryB = this.getCategoryName(b.categoryId).toLowerCase();
      if (sortOrder === "asc") {
        return categoryA < categoryB ? -1 : categoryA > categoryB ? 1 : 0;
      } else {
        return categoryA > categoryB ? -1 : categoryA < categoryB ? 1 : 0;
      }
    });

    this.setState({
      transactions: sortedTransactions,
      sortOrder: sortOrder === "asc" ? "desc" : "asc"
    });
  }

  deleteFirstRow() {
    // For now just hide the first row
    this.setState({ showFirstRow: false });
    // Or add your own delete logic here
  }

  render() {
    const { searchTitle, transactions, currentTransaction, currentIndex, showFirstRow } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by transaction name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h4>Transactions List</h4>
          <table
            className="table table-striped"
            style={{ width: "100%", maxWidth: "900px", margin: "auto" }}
          >
            <thead>
              <tr>
                <th>SL</th>
                <th>Mood</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Hardcoded first row with Delete button */}
              {showFirstRow && (
                <tr>
                  <td>1</td>
                  <td>Happy</td>
                  <td>Today I am happy</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={this.deleteFirstRow}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )}

              {/* Transactions list starting from SL 2 */}
              {transactions && transactions.map((transaction, index) => (
                <tr
                  className={index === currentIndex ? "active clickable" : "clickable"}
                  onClick={() => this.setActiveTransaction(transaction, index)}
                  key={transaction.id || index}
                >
                  <td>{index + (showFirstRow ? 2 : 1)}</td> {/* Adjust SL based on first row */}
                  <td>{this.getCategoryName(transaction.categoryId)}</td>
                  <td>{transaction.description}</td>
                  <td></td> {/* Empty cell for actions column */}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTransactions}
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}
