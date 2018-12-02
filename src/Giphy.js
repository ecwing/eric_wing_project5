import React, {Component, Fragment} from 'react';
import axios from 'axios';

// API KEY FOR GIPHY
const api_key = 'pX65UNlFkSNlNESWjjpoX92eMzUcwZEs';

class MotivationalGif extends Component {
  constructor() {
    super()
    this.state = {
      img: "",
      description: ""
    }
  }

  


  fetchRandomGif = () => {
    console.log('fuck you');

    const url = `http://api.giphy.com/v1/gifs/random?tag=motivate&api_key=${api_key}`;
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
        <button onClick={this.fetchRandomGif}>Motivate Me!</button>
        <img src={this.state.img} alt={this.state.description}/>
      </Fragment>
    )
  }

}
export default MotivationalGif;