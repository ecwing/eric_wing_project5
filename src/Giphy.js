import React, {Component, Fragment} from 'react';
import axios from 'axios';

// API KEY & URL FOR GIPHY
const api_key = '5yMAlmU3mqGPeBQwcLBkWVS8gHWPOyb4';
const url = `http://api.giphy.com/v1/gifs/random?tag=motivation&api_key=${api_key}`;

class MotivationalGif extends Component {
  constructor() {
    super()
    this.state = {
      img: "",
      description: ""
    }
  }

  fetchRandomGif = () => {

    axios.get(url)
      .then(({ data }) =>
        this.setState({ 
          img: data.data.images.fixed_height.url,
          description: data.data.title
        })
      )
      .catch(e => console.log('error', e));
  }

  render() {
    return (
      <Fragment>
        <button className="hitMe" onClick={this.fetchRandomGif}>Hit me with a motivational GIF!</button>
        <div>
          <img src={this.state.img} height="300" alt={this.state.description}/>
        </div>
      </Fragment>
    )
  }

}
export default MotivationalGif;