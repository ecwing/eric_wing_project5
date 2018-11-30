import React, { Component } from 'react';
import Moment from 'moment';

class Date extends Component {
    render() {
        return (
            <div className='date'>
                <h3>{Moment().format('dddd')} {Moment().format('LL')}</h3>
                {/* <p>{Moment().format('LL')}</p> */}
            </div>
        )
    }

}
export default Date;