import React from 'react'
import {Button, Container, Divider, Form, Grid, Segment} from 'semantic-ui-react'
import {action} from "mobx";
import api from "../api";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            username: '',
            password: '',
            auth: false
        };
    }


    handleSubmit(e) {
        console.log(this.state)

        const requestData = {
            password: this.state.password,
            username: this.state.username
        };

        api.HomeSystem.authenticate(requestData).then(
            action(response => {
                localStorage.removeItem("userAppToken")
                localStorage.setItem('userAppToken', response.accessToken);
                this.setState({auth: true})
            })).catch((err) => {
            console.log(err.response.body.message)
            console.log(err.response.body.status)
            console.log(err.response.body.code)
        });
    }

    handleUserNameChange(e) {
        this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <Container style={{ margin: 20 }}>
                <Segment placeholder>
                    <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    label='Логин'
                                    placeholder='Username'
                                    value={this.state.username}
                                    onChange={this.handleUserNameChange}
                                />
                                <Form.Input
                                    icon='lock'
                                    iconPosition='left'
                                    label='Пароль'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />

                                <Button content='Login' primary type='submit'/>
                            </Form>
                        </Grid.Column>

                        <Grid.Column verticalAlign='middle'>
                            <Button content='Sign up' icon='signup' size='big'/>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Or</Divider>
                </Segment>
            </Container>
        );
    }
}

export default LoginForm;



