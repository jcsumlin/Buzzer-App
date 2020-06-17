import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {db} from "../services/firebase";


class Buzzer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: this.props.settings,
            buttonPushed: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userRef = db.ref(this.props.roomCode).child('players').child(this.props.userKey)
    }

    async componentDidMount() {
        let currentComponent = this;
        this.userRef.child('buzzed').on('value', function (snapshot) {
            currentComponent.setState({buttonPushed: snapshot.val()})
        });
    }

    handleSubmit(event) {
        this.userRef.update({buzzed: true, time: Date.now()});
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Button type="submit" disabled={this.state.buttonPushed}>Buzz</Button>
                </Form>
            </div>
        );
    }
}

export default Buzzer;