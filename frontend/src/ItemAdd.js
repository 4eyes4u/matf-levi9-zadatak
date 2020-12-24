import React, {Component} from 'react'

export default class ItemAdd extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                <p>Naziv</p>
                <input type="text" name="nazivInput"></input>
                <p>Opis</p>
                <input type="text" name="opisInput"></input>
                <input type="button" name="btnSend"></input>
            </form>
        )
    }
}