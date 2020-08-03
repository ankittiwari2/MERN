import React, { Component } from 'react';
import getFromStroage from '../../util/util'

class Person extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signUpError: '',
            signInEmail: '',
            signInPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpPassword: ''

        };

        this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this)
        this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this)
        this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this)
        this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this)
        this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this)
        this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this)
        this.onSignUpChange = this.onSignUpChange.bind(this)
        // this.onSignUpChange = this.onSignUpChange.bind(this)


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
    onTextBoxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value
        })
    }
    onTextBoxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value
        })
    }
    onTextBoxChangeSignUpFirstName(event) {
        this.setState({
            signUpFirstName: event.target.value
        })
    }
    onTextBoxChangeSignUpLastName(event) {
        this.setState({
            signUpLastName: event.target.value
        })
    }

    onSignUpChange() {
        const {
            signUpPassword,
            signUpEmail,
            signUpFirstName,
            signUpLastName
        } = this.state

        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: signUpFirstName,
                lastName: signUpLastName,
                email: signUpEmail,
                password: signUpPassword
            })
        }).then(res => res.json())
            .then(json => {
                if (json.status==200) {
                    console.log(json)
                    this.setState({
                        signUpError: json.message,
                        isLoading: false,
                        signUpEmail: '',
                        signUpFirstName: '',
                        signUpPassword: '',
                        signUpLastName: ''


                    })
                }else{
                return(<div><p>{json.message}</p></div>)
                }
            })
    }

    render() {
        const {
            isLoading,
            token,
            signInEmail,
            signInPassword,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signInError,
            signUpPassword
        } = this.state;
        return (

            <div>
                <p>Hello</p>
                <input type="text"
                    placeholder="firstName"
                    value={signUpFirstName}
                    onChange={this.onTextBoxChangeSignUpFirstName}
                />

                <input type="text"
                    placeholder="lastName"
                    value={signUpLastName}
                    onChange={this.onTextBoxChangeSignUpLastName}

                />
                <input
                    type="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={this.onTextBoxChangeSignUpEmail}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={this.onTextBoxChangeSignUpPassword}
                />
                <button onClick={this.onSignUpChange} >SignUp</button>
            </div>

        )
    }


}


const HelloWorld = () => (
    <div>
        <p>SignUp</p>
        <input type="text"
            placeholder="firstName"
        //value={signUpFirstName}
        // onChange={this.onTextBoxChangeSignUpFirstName}
        />
        <input type="text"
            placeholder="lastName"


        />
        <input
            type="email"
            placeholder="Email"
        // value={signUpEmail}
        // onChange={this.onTextBoxChangeSignUpEmail}
        />
        <input
            type="password"
            placeholder="Password"
        // value={signUpPassword}
        // onChange={this.onTextBoxChangeSignUpPassword}
        />
        <button >SignUp</button>
    </div>


);

export default Person;