import React from "react";
import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      fields: [],
      Namefield: { value: '', error: '' },
      Emailfield: { value: '', error: '' },
      Mobilefield: { value: '', error: '' },
      tablerows: []
    };
    this.handleName = this.handleName.bind(this);
    this.handleMobile = this.handleMobile.bind(this);
    this.handleMail = this.handleMail.bind(this);
    this.addRow = this.addRow.bind(this);
  }
  handleName(e) {
    this.setState({
      Namefield: {
        value: e.target.value,
        error: false
      }
    })
  }
  handleMobile(e) {
    this.setState({
      Mobilefield: {
        value: e.target.value,
        error: false
      }
    })
  }
  handleMail(e) {
    this.setState({
      Emailfield: {
        value: e.target.value,
        error: false
      }
    })
  }

  addRow(e) {
    e.preventDefault();
    var newdata = { name: this.state.Namefield.value, mobile: this.state.Mobilefield.value, mail: this.state.Emailfield.value }
    // //take the existing state and concat the new data and set the state again
    this.setState({ tablerows: this.state.tablerows.concat(newdata), flag: true });

    const name1 = this.state.Namefield;
    const mob1 = this.state.Mobilefield;
    const mail1 = this.state.Emailfield;

    if (name1.value !== "") {
      const newName = [...this.state.fields, name1]
      this.setState({
        fields: newName,
        Namefield: {
          value: '',
          error: ''
        }
      })
    }

    if (mob1.value !== "") {
      const newMob = [...this.state.fields, mob1]
      this.setState({
        fields: newMob,
        Mobilefield: {
          value: '',
          error: ''
        }
      })
    }

    if (mail1.value !== "") {
      const newMail = [...this.state.fields, mail1]
      this.setState({
        fields: newMail,
        Emailfield: {
          value: '',
          error: ''
        }
      })
    }

  }

  deleteRow(passedID) {
    let tablerows = [...this.state.tablerows]
    tablerows.splice(passedID, 1)
    this.setState({
      tablerows: tablerows
    })
  }

  editRow = (index, type, values) => {

    const newState = this.state.tablerows.map((item, i) => {
      if (i === index) {
        return { ...item, [type]: values };
      }
      return item;
    });
    this.setState({
      tablerows: newState
    });

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">Sample CRUD Operations</header>
        <form >
          <input
            type="text"
            placeholder="Name"
            value={this.state.Namefield.value}
            onChange={this.handleName} />       <br />
          <input
            type="number"
            placeholder="Mobile"
            maxLength="10"
            value={this.state.Mobilefield.value}
            onChange={this.handleMobile} />          <br />
          <input
            type="email"
            placeholder="Email"
            value={this.state.Emailfield.value}
            onChange={this.handleMail} />          <br />
          <div>
            <button onClick={this.addRow}>ADD</button>
          </div>
        </form>

        {this.state.tablerows.length > 0 ?
          <table style={{ "backgroundColor": "rgb(192, 217, 236)" }}>
            <thead style={{ "backgroundColor": "rgb(73, 116, 201)", "color": "white" }}>
              <tr style={{ "height": "50px" }}>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tablerows.map((row, index) =>
                <tr key={index}>
                  <td> <input
                    type="text"
                    value={row.name}
                    onChange={(e) => this.editRow(index, "name", e.target.value)} /></td>
                  <td> <input
                    type="number"
                    maxLength="10"
                    value={row.mobile}
                    onChange={(e) => this.editRow(index, "mobile", e.target.value)} /></td>
                  <td> <input
                    type="email"
                    value={row.mail}
                    onChange={(e) => this.editRow(index, "mail", e.target.value)} /></td>
                  <td><button className="deleteBtn" onClick={() => this.deleteRow(index)}>-</button></td>
                </tr>)}
            </tbody>
          </table> : ""}
      </div>
    );
  }
}
