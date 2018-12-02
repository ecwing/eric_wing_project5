import React, { Component } from 'react';
import Date from './Date.js'

class header extends Component {
    render() {
        return (
            <header>
                <h1>BuJo To Go!</h1>
                <h2>Your Convenient Bullet Journal On-The-Go</h2>
                <div className="explanation">
                    <ul>
                        <li className="task">Each Bullet is a Task: Things you have to do</li>
                        <li className="event">Each Circle is an Event: Noteworthy moments in time</li>
                        <li className="note">Each Square is a Note: Things you don't want to forget</li>
                    </ul>
                    {/* DATE COMPONENT */}
                    <Date />
                </div>
            </header> 
        )
    }

}
export default header;