import React from "react";
import {Button, Card, CardTitle, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {getQuoteData} from "../Utils/utils";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    retrieveData(stock) {
        getQuoteData(stock).then(data => {
            this.setState({data});
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <Container>
                <Card body>
                    <CardTitle>Login</CardTitle>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label for="RHEmail" hidden>Email</Label>
                            <Input type="email" name="email" id="RHEmail" placeholder="Email"
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Label for="RHPass" hidden>Password</Label>
                            <Input type="password" name="password" id="RHPass" placeholder="Password"
                                   onChange={this.handleChange}/>
                        </FormGroup>
                        {' '}
                        <Button onClick={() => {
                            this.login()
                        }}>Submit</Button>
                    </Form>
                </Card>
            </Container>
        )

    }
}

export default Login
