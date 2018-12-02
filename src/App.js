import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import Header from "./Header";
import Footer from "./Footer";

//reference to the root of the database
const dbRef = firebase.database().ref();

// API KEY FOR GIPHY
const api_key = 'pX65UNlFkSNlNESWjjpoX92eMzUcwZEs';

class App extends Component {
  constructor() {
    super();     // set up our react state
    this.state = {
      task: "",
      term: "",
      img: "",
      toDo: {}
    }
  }

  onChange = (event) => {
    this.setState({ 
      term: event.target.value 
    });
  }

  handleSubmitGif = (event) => {
    event.preventDefault();
    const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ 
        term:'', 
        img: data.data[0].images.fixed_height.url
      }))
      .catch(e => console.log('error', e));
  }

  componentDidMount() {
    // creates reference to message in firebase database
    console.log("I mounted!");
    const dbRef = firebase.database().ref();
    dbRef.on("value", snapshot => {
      // /* Update React state when message is added at Firebase Database */
      const newtoDo = snapshot.val() === null ? {} : snapshot.val();
      this.setState({
        toDo: newtoDo
      })
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //prevents form submit from reloading the page
    const newTask = {
      task: this.state.task,
      type: this.state.bullet,
      datePosted: new Date()
    };
    /* Send the data to Firebase */
    dbRef.push(newTask)    //This function clears the form/inputs
    this.setState({
      task: "",
      value: "",
      bullet: ""
    })
  }

  handleType = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  deleteItem = (e) => {//e.target is the button - id is what we want
    const firebaseKey = e.target.id;
    const itemRef = firebase.database().ref(`${firebaseKey}`);
    itemRef.remove();
  };

  render() {
    const todos = Object.entries(this.state.toDo);

    return (
      <div className="App">

      <Header />

        <form action="" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="task">To Do: </label>
          <input 
          placeholder="Enter your task here!"
          type="text"
          onChange={this.handleChange}
          id="task"
          value={this.state.task} />

          <select 
            name="Select bullet type" 
            id="bullet" 
            className="bullet"
            onChange={this.handleType}
            value={this.state.value}>
            <option value="" disabled selected className="placeholder">Select A Type</option>
            <option value="task">Task</option>
            <option value="note">Notes</option>
            <option value="event">Event</option>
          </select>
        </div>
        <input 
        type="submit" value="Add Bullet" />
        </form>
        {/* want to show total tasks  */}
        <h3>Total # of Tasks: {todos.length}</h3>

          <section className="add-item">
            {
              todos.map(([id, item]) => {
                console.log(item);
                return (
                  <div key={id} className="results">
                    <ul className="taskflex">
                      {/* {renders list of tasks to complete} */}
                      <li className={item.type}>{item.type} - {item.task}</li>
                    <button 
                      id={id}
                      className="delete" 
                      onClick={this.deleteItem}>X</button>
                    </ul>
                  </div>
                );
              })
            }
          </section>

          <section>
            <div className="App">
              <form onSubmit={this.handleSubmitGif}>

                <input value={this.state.term} onChange={this.onChange} />

                {/*want to change to random motivating GIFS */}
                <button onClick={this.randomGif}>Hit me with a Motivational Gif!</button>
                
              </form>
              <img src={this.state.img} height="200" alt={this.state.term} />
            </div>            
          </section>

          <Footer />
      </div>
    );
  }
}
export default App;
// className = { taskClass }

// 1.capture the value with onchange (if only need on the select google)
// 2. use value onsubmit (capture on state) to set className variable










// import React, { Component } from 'react';
// import './App.css';
// import firebase from './firebase.js';


// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       currentItem: "",
//       username: "",
//       items: []
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     const itemsRef = firebase.database().ref('items');
//     itemsRef.on('value', (snapshot) => {
//       let items = snapshot.val();
//       let newState = [];
//       for (let item in items) {
//         newState.push({
//           id: item,
//           title: items[item].title,
//           user: items[item].user
//         });
//       }
//       this.setState({
//         items: newState
//       });
//     });
//   }

//   handleChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }

//   removeItem(itemId) {
//     const itemRef = firebase.database().ref(`/items/${itemId}`);
//     itemRef.remove();
//   }

//   handleSubmit = e => {
//     //need to prevent the default behavior of the form, which if we don't will cause the page to refresh when you hit the submit button.
//     e.preventDefault();
//     //need to carve out a space in our Firebase database where we'd like to store all of the items that people are bringing to the potluck. We do this by calling the ref method and passing in the destination we'd like them to be stored (items).
//     const itemsRef = firebase.database().ref('items');
//     //grab the item the user typed in (as well as their username) from the state, and package it into an object so we ship it off to our Firebase database.
//     const item = {
//       title: this.state.currentItem,
//       user: this.state.username
//     }
//     //this sends a copy of our object so that it can be stored in Firebase.
//     itemsRef.push(item);
//     //clear out the inputs so that an additional item can be added.
//     this.setState({
//       currentItem: '',
//       username: '',
//     });  
//     // this.handleChange = this.handleChange.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);   
//   }

//   render() {
//     return (
//       <div className='app'>
//         <header>
//             <div className="wrapper">
//               <h1>Fun Food Friends</h1>
                             
//             </div>
//         </header>
//         <div className='container'>
//           <section className='add-item'>
//                 <form onSubmit={this.handleSubmit}>
//                   <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
//                   <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
//                   <button>Add Item</button>
//                 </form>
//           </section>
//           <section className='display-item'>
//               <div className="wrapper">
//                 <ul>
//                   {this.state.items.map((item) => {
//                     return (
//                       <li key={item.id}>
//                         <h3>{item.title}</h3>
//                         <p>brought by: {item.user}
//                           <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
//                         </p>
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </div>
//           </section>
//         </div>
//       </div>
//     );
//   }
// }
// export default App;




// import axios from "axios";




  // componentDidMount() {
  //   axios.get(`http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}`, {
  //   params: {
  //     key: api_key,
  //     q: this.props.term
  //   }
  // }).then(res => {
  //   console.log(res)
  // })
