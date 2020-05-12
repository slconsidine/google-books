import React, { Component } from "react";
import API from "../../utils/API";

class Saved extends Component {
    state = {
        savedBooks: []
    }

    componentDidMount() {
        this.loadSaved()
    }

    loadSaved = () => {
        API.getSaved()
            .then(res =>
                this.setState({ savedBooks: res.data }))
            .catch(err => console.log(err));
    }
}

export default Saved;