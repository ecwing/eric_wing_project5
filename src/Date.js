import React, { Component } from 'react';
import Moment from 'moment';

class Date extends Component {
    render() {
        return (
            <div className='date'>
                <h3>Today's Date: {Moment().format('dddd')} {Moment().format('LL')}</h3>
            </div>
        )
    }

}
export default Date;