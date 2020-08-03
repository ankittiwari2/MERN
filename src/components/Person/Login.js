import React, { Component } from 'react';
import { Redirect, Route } from "react-router";
import getFromStroage from "../../util/util";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signUpError: '',
            signInEmail: '',
            signInPassword: '',
            isLoggedIn: false,
            taskName: '',
            taskTime: ''

        };

        this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this)
        this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this)
        this.onTextBoxChangetaskName = this.onTextBoxChangetaskName.bind(this)
        this.onTextBoxChangetaskTime = this.onTextBoxChangetaskTime.bind(this)
        this.onSignInChange = this.onSignInChange.bind(this)
        this.onAddTask = this.onAddTask.bind(this)


    }
    componentDidMount() {
        let token = getFromStroage("app");
        if (token) {
            fetch('api/lobbbb')
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        this.setState({
                            token: token,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            isLoading: false
                        })
                    }
                }
                )
        }
        else {
            this.setState({
                isLoading: false
            })
        }
    }

    onTextBoxChangeSignInEmail(event) {
        this.setState({
            signInEmail: event.target.value
        })
    }
    onTextBoxChangeSignInPassword(event) {
        this.setState({
            signInPassword: event.target.value
        })
    }
    onTextBoxChangetaskName(event) {
        this.setState({
            taskName: event.target.value
        })
    }
    onTextBoxChangetaskTime(event) {
        this.setState({
            taskTime: event.target.value
        })
    }

    onSignInChange() {
        const {
            signInPassword,
            signInEmail,
        } = this.state

        fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        }).then(res => res.json())
            .then(json => {
                console.log(json, "jdnddn")
                if (json.status == 200) {
                    localStorage.setItem("app", JSON.stringify(json.data.token));
                    console.log(json)
                    this.setState({
                        isLoggedIn: true,
                        signUpError: json.message,
                        isLoading: false,
                        signInEmail: '',
                        signInPassword: '',

                    })
                } else {
                    this.setState({
                        isLoggedIn: false,


                    })
                }
            })
    }

    onAddTask() {
        const {
            taskName,
            taskTime
        } = this.state
        let token = localStorage.getItem("app");

        fetch("http://localhost:3000/users/AddTask", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                taskName: taskName,
                taskTime: taskTime
            })
        }).then(res => res.json())
            .then(json => {
                console.log(json, "jdnddn")
                if (json.status == 200) {

                    console.log(json)
                    this.setState({
                        taskName: '',
                        taskTime: '',

                    })
                } else {
                    this.setState({
                        isLoggedIn: false,


                    })
                }
            })
    }

    render() {
        const {
            isLoading,
            token,
            isLoggedIn,
            signInEmail,
            signInPassword,
            signInError,
            taskName,
            taskTime
        } = this.state;
        return (

            <div>


                <p>Login</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={signInEmail}
                    onChange={this.onTextBoxChangeSignInEmail}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={signInPassword}
                    onChange={this.onTextBoxChangeSignInPassword}
                />
                <br /><br />
                <button onClick={this.onSignInChange} >Login</button><br /><br />
                {(isLoggedIn) ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={taskName}
                            onChange={this.onTextBoxChangetaskName}
                        />
                        <input
                            type="text"
                            placeholder="Task Time"
                            value={taskTime}
                            onChange={this.onTextBoxChangetaskTime}
                        />
                        <button onClick={this.onAddTask}>Add Task</button>
                    </div>
                ) : null}
            </div>

        )
    }


}
export default Login;