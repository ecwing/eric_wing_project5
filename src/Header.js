import React, { Component } from 'react';
import Date from './Date.js';

class header extends Component {
    render() {
        return (
            <header>
                <a href="#maincontent" className="skip-link">Skip to main content.</a>
                <div className="titleFlex">
                    <img src={require("./assets/iphone.svg")} alt="pen icon" />    
                    <h1>BuJo To Go!</h1>
                    <img src={require("./assets/pen.svg")} alt="pen icon" />
                </div>
                <h2>"Your Convenient Bullet Journal On-The-Go"</h2>
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