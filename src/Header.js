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
                        <li className="task">Each Bullet is a Task</li>
                        <li className="event">Each Circle is an Event</li>
                        <li className="reminder">Each Square is a Reminder</li>
                    </ul>
                    {/* DATE COMPONENT */}
                    <Date />
                </div>
            </header> 
        )
    }

}
export default header;