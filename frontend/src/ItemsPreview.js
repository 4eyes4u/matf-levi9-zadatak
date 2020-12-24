// Page for previewing what's in the DB and for deletion.
import React, {Component} from 'react'
import {Button, Table} from 'react-bootstrap'
import './ItemsPreview.css';

export default class ItemsPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableRows: []
    }

    this.renderCallback = this.renderCallback.bind(this);
  }

  componentDidMount() {
    this.renderCallback();
  }

  renderCallback() {
    fetch('/admin/proizvodi')
    .then((res) => res.json())
    .then((res) => {
      let tableRows = []
      for (const [key, value] of Object.entries(res)) {
        let item = {
          id: parseInt(key),
          name: value.name,
          description: value.description
        };

        tableRows.push(item)
      }

      this.setState({tableRows: tableRows})
    })
    .catch((err) => console.error(err));
  }

  deleteCallback = async(id) => {
    const res = await fetch('/admin/proizvodi', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id}),
    });

    res
    .json()
    .then((res) => {
        let tableRows = []
        for (const [key, value] of Object.entries(res)) {
            const item = {
              id: parseInt(key),
              name: value.name,
              description: value.description
            };

            tableRows.push(item);
        }

        this.setState({tableRows: tableRows});
    })
  }

  render() {
    return (
      <div id="ItemsPreview">
        {this.props.children}
        <table>
          <thead>
            <tr key={""}>
              <th>id</th>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Obriši?</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.tableRows.map((row) => (
                <tr key={row.name + row.description}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>
                    <button type="submit" onClick={() => this.deleteCallback(row.id)}>Obriši</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
};
