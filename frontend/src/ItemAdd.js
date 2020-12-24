// Page for adding new item in the DB.
import React, {Component} from 'react'
import './ItemAdd.css';

export default class ItemAdd extends Component {
    constructor(props) {
        super(props);

        this.sendCallback = this.sendCallback.bind(this);
        this.nameInputChange = this.nameInputChange.bind(this);
        this.descriptionInputChange = this.descriptionInputChange.bind(this);
        this.state = {
          name: undefined,
          description: undefined
        }
    }

    nameInputChange(e) {
      this.setState({"name": e.target.value});
    }

    descriptionInputChange(e) {
      this.setState({"description": e.target.value});
    }

    sendCallback = async() => {
      if (this.state.name === undefined || this.state.description === undefined) {
        console.log("Inputs should not be empty")
      } else {
        await fetch('/admin/unos-novog-proizvoda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            description: this.state.description
          })
        });
      }

      document.querySelectorAll('input').forEach(input => (input.value = ""));
      this.setState({name: undefined, description: undefined});
    }

    render() {
        return (
            <form>
              <div id="ItemAdd">
                <label>Naziv</label>
                <input type="text" id="nameInput" onChange={this.nameInputChange}></input>
                <label>Opis</label>
                <input type="text" id="descriptionInput" onChange={this.descriptionInputChange}></input>
                <button type="submit" onClick={this.sendCallback}>Unesi</button>
              </div>
            </form>
        )
    }
}