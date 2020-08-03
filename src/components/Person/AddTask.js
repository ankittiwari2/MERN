import React, { Component } from 'react';
import { Redirect, Route } from "react-router";
import getFromStroage from "../../util/util";

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signUpError: '',
            isLoggedIn: false,
            taskName: '',
            taskTime: ''

        };

        this.onTextBoxChangetaskName = this.onTextBoxChangetaskName.bind(this)
        this.onTextBoxChangetaskTime = this.onTextBoxChangetaskTime.bind(this)
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
                userName: taskTime
            })
        }).then(res => res.json())
            .then(json => {
                console.log(json, "jdnddn")
                if (json.status == 200) {

                    console.log(json)
                    this.setState({
                        isLoggedIn: true,
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
            signInError,
            taskName,
            taskTime
        } = this.state;
        return (

            <div>


                <p>Add Task</p>

                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={this.onTextBoxChangetaskName}
                />
                <input
                    type="text"
                    placeholder="user Name"
                    value={taskTime}
                    onChange={this.onTextBoxChangetaskTime}
                />
                <button onClick={this.onAddTask}>Add Task</button>
                <br /><br />
                {(isLoggedIn) ? (
                    <div>
                        <p>Task Added</p>
                    </div>
                ) : null}
            </div>

        )
    }


}
export default AddTask;