import React, { Component } from 'react';
import getFromStroage from '../../util/util'

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            signUpError: '',
            item: []

        };


        this.onGetTaskData = this.onGetTaskData.bind(this)


    }

    componentDidMount() {
        fetch('http://localhost:3000/users/taskList')
            .then(res => res.json())
            .then(res => {
                console.log(res.data, "jjjj")
                if (res.data.length > 0) {
                    this.setState({
                        isLoading: false,
                        item: res.data
                    })
                } else {

                }
            }
            )
    }

    onGetTaskData() {
        console.log("hello")
        alert("hello")
        fetch("http://localhost:3000/users/taskList")
            .then(res => res.json())
            .then(json => {
                console.log(json, "jjjjjj")
                if (json.status == 200) {
                    console.log(json)
                    this.setState({
                        signUpError: json.message,
                        isLoading: false


                    })
                } else {
                    return (<div><p>{json.message}</p></div>)
                }
            })
    }

    render() {
        const {
            isLoading,
            token,
            signInError,
            item
        } = this.state;
        return (
            <div>
                <p>Task List</p>

                <ul>
                    {item.map(item => (
                        <li key={item._id}>Name:{item.taskName} | userName:{item.userName}</li>
                    )
                    )}
                </ul>
            </div>

        )
    }

}




export default TaskList;