import React from "react";
import {Button, Card, CardTitle, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import auth from "../Utils/auth"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    login() {
        // fetch('/account/rest-auth/login/', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: this.state.email,
        //         password: this.state.password,
        //     }),
        // });

        let username = this.state.email;
        let pass = this.state.password;

        auth.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                this.setState({
                    userLogged: true
                })
            }
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

                        <Button onClick={() => {
                            this.setState({
                                userLogged: false
                            })
                            auth.logout();
                        }}>Logout</Button>

                    </Form>
                </Card>
            </Container>
        )
    }
}

export default Login
