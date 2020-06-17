import React, {Component} from 'react';
import {db} from "../services/firebase"
import Button from "react-bootstrap/Button";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


class Host extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            readError: null,
            writeError: null,
            roomPin: Math.floor(100000 + Math.random() * 900000),
            maxPlayers: 8,
        };
        this.roomCodeRef = db.ref().child(this.state.roomPin);
        this.resetBuzzers = this.resetBuzzers.bind(this);

    }


    async createRoom() {
        this.roomCodeRef.child('settings').set(
            {
                lockedRoom: false,
                oneBuzzOnly: true,
                lockedBuzzers: false
            }
        );
    }

    async getPlayers() {
        let currentComponent = this;
        this.roomCodeRef.on('value', function (snapshot) {
            let obj = snapshot.val();
            if (obj.hasOwnProperty('players')) {
                let players = [];
                Object.values(obj.players).map(player => {
                    return players.push(player)
                });
                players.sort(function (a, b) {
                    var keyA = new Date(a.time),
                        keyB = new Date(b.time);
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                });
                currentComponent.setState({players: players});
            }
        }, function (errorObject) {
            currentComponent.setState({readError: "Could not get players from database!"})
        })
    }

    async componentDidMount() {
        this.setState({readError: null});
        try {
            this.createRoom();
            this.getPlayers();

        } catch (error) {
            this.setState({readError: error.message});
        }
    }

    async resetBuzzers() {
        let currentComponent = this;
        this.roomCodeRef.child('players').once('value', function (snapshot) {
            for (let [key, player] of Object.entries(snapshot.val())) {
                player.buzzed = false;
                player.time = 0;
                console.log(player);
                currentComponent.roomCodeRef.child('players').child(key).update(player)
            }
        }, function (snapshot) {
            alert("Invalid room pin!")
        })
    }

    async toggleLock() {
        let status = !this.state.settings.lockedBuzzers;
        this.roomCodeRef.child('settings').update({lockedBuzzers: status})
    }


    render() {
        return (
            <Container fluid={false} style={{margin: "25px"}} >
                    <h2>Game Code: {this.state.roomPin}</h2>
                    <br/>
                    <Button onClick={this.resetBuzzers}>Reset ALL Buzzers</Button>
                    {/*<p>Spacebar also resets buzzers!</p>*/}
                    {/*<Button className="btn-warning" onClick={this.toggleLock()}>Toggle Lock</Button>*/}
                    <h2>Players:</h2>
                    {/*<p>Player Limit: 8</p>*/}
                    <br/>
                    <h4>Buzzed Players:</h4>
                    <ul>
                        {this.state.players.map(player => {
                            if (player.buzzed) {
                                return (<li>
                                    {player.nick}
                                </li>)
                            }
                            return null
                        })}
                    </ul>
                    <h4>Not Buzzed Players:</h4>
                    {this.state.players.length === 0 ? <p>Waiting for players to join...</p> : null}
                    {this.state.readError ? <p>{this.state.readError}</p> : null}
                    <ul>
                        {this.state.players.map(player => {
                            if (!player.buzzed) {
                                return (<li>
                                    {player.nick}
                                </li>)
                            }
                            return null
                        })}
                    </ul>
            </Container>
        );
    }
}


export default Host;