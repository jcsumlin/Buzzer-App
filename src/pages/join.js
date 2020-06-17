import React, {Component} from 'react';
import {db} from "../services/firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Buzzer from "./buzzer";

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readError: null,
            writeError: null,
            roomPin: "",
            nick: "",
            settings: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        if (event.target.name === 'roomPin') {
            if (event.target.value.match('^[0-9]*$') === null || event.target.value.length === 7) {
                return;
            }
        }
        if (event.target.name === 'nick') {
            if (event.target.value.match('^[a-zA-Z0-9 ]{1,32}$') === null) {
                return
            }
        }
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        let currentComponent = this;
        this.roomCodeRef = db.ref().child(this.state.roomPin);
        this.roomCodeRef.once('value', function (snapshot) {
            let obj = snapshot.val();
            console.log(obj);
            if (obj === null) {
                currentComponent.setState({roomPin: ""});
                alert("Invalid room pin!");
                return;
            }
            let settings = obj.settings;
            let key = this.roomCodeRef.child('players').push({nick: this.state.nick, buzzed: false, time: 0}).key;
            currentComponent.setState({userKey: key, settings: settings});
        }, function (errorObject) {
            alert("Invalid room pin!")
        });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Container>
                    {this.state.settings ? <Buzzer settings={this.state.settings} roomCode={this.state.roomPin} userKey={this.state.userKey}/> :
                        <Row className="justify-content-md-center">
                            <Col>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Room Pin</Form.Label>
                                        <Form.Control name="roomPin" type="text" onChange={this.handleChange}
                                                      value={this.state.roomPin}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Nickname</Form.Label>
                                        <Form.Text className="text-muted">
                                            Max 32 characters
                                        </Form.Text>
                                        <Form.Control name="nick" type="text" onChange={this.handleChange}
                                                      value={this.state.nick}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Join Room
                                    </Button>
                                </Form>
                            </Col>
                        </Row>}
                </Container>

            </div>
        );
    }
}

export default Join;