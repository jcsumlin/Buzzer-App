import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

class Home extends Component {
    render() {
        return (
            <Container>
                <Row style={{margin: "25px"}}>
                    <Button href="/host" variant="primary" size="lg" block>Host</Button>
                    <Button href="/join" variant="secondary" size="lg" block>Join</Button>
                </Row>
                    <h2>How to Play (It's simple!)</h2>
                    <ol>
                        <li>The host creates a lobby</li>
                        <li>A room code is generated on the hosts's dashboard</li>
                        <li>Players "Join" the hosts's game using that pin</li>
                        <li>That's it!</li>
                    </ol>
                    <a href="https://www.patreon.com/bePatron?u=13355013" data-patreon-widget-type="become-patron-button"><img
                        src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="Become a Patron" height="50"/></a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>
            </Container>
        );
    }
}

export default Home;