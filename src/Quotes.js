import React, { Component } from 'react';
import axios from "axios"; 

class Art extends Component {
    constructor() {
        super();
        //set some initial state
        this.state = {
            quote: []
        }
    }


    componentDidMount(){
        axios.get("https://healthruwords.p.mashape.com/v1/topics/", {
            params: {
                t: wisdom
            }
        }
    }
}