import React, { Component } from "react";

export default class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      description: "",
      moods: ["happy", "sad", "natural", "excited"],
    };

    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
  }

  onChangeCategoryId(e) {
    this.setState({ categoryId: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  saveTransaction() {
    // Just console log to simulate submission
    console.log("Submitted:", {
      mood: this.state.categoryId,
      description: this.state.description,
    });

    // Clear inputs immediately
    this.setState({
      categoryId: "",
      description: "",
    });
  }

  render() {
    return (
      <div className="submit-form" style={{ maxWidth: 400, margin: "20px auto" }}>
        <div className="form-group">
          <label htmlFor="categoryId">Mood</label>
          <select
            id="categoryId"
            className="form-control"
            value={this.state.categoryId}
            onChange={this.onChangeCategoryId}
          >
            <option value="">Select mood</option>
            {this.state.moods.map((mood, index) => (
              <option key={index} value={mood}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ marginTop: 15 }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="3"
            value={this.state.description}
            onChange={this.onChangeDescription}
            placeholder="Write your description here..."
          />
        </div>

        <button
          onClick={this.saveTransaction}
          className="btn btn-success"
          style={{ marginTop: 20 }}
        >
          Submit
        </button>
      </div>
    );
  }
}
