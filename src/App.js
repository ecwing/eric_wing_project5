import React, { Component } from 'react';
import './App.css';
import Date from './Date.js'
import firebase from "./firebase";


//reference to the root of the database
const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    // set up our react state
    this.state = {
      task: "",
      type: "",
      toDo: {}
    }
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
      type: this.state.type,
      // datePosted: new Date()
    };
    /* Send the data to Firebase */
    dbRef.push(newTask)
    //This function clears the form/inputs
    this.setState({
      task: "",
      bullet: ""
      // type: ""
    })
  }

  // listenForUserInput = function () {
  //   $("select").on("change", function () {
  //     const bulletType = $(this).val();
  //   });
  // }

  deleteItem = (e) => {
    //delete the book from firebase
    //e.target is the button - id is what we want
    const firebaseKey = e.target.id;
    const itemRef = firebase.database().ref(`${firebaseKey}`);
    itemRef.remove();
  };

  // taskClass = () => {
  //   if 
  // }

  render() {
    return (
      <div className="App">
        <h1>BuJo To Go!</h1>
        <h2>Your Convenient Bullet Journal On-The-Go</h2>
        {/* DATE COMPONENT */}
        <Date />

        <form action="" onSubmit={this.handleSubmit}>

        <label htmlFor="task">To Do: </label>
        <input 
         placeholder="Enter your task here!"
        type="text"
        onChange={this.handleChange}
        id="task"
        value={this.state.task} />

        {/* <label htmlFor="type">Type: </label>
        <input
          placeholder="Task Event or Reminder"
          type="text"
          onChange={this.handleChange}
          id="type"
          value={this.state.type} /> */}

          <select 
          name="Select bullet type" 
          id="bullet" 
          className="bullet"
          onChange={this.handleChange}
          value={this.state.value}>
            <option value="" disabled selected className="placeholder">Select A Type</option>
            <option value="task">Task</option>
            <option value="reminder">Reminder</option>
            <option value="event">Event</option>
          </select>
        <input 
        type="submit" value="Add Bullet" />
        </form>

          <section>
            {
              Object.entries(this.state.toDo).map((item) => {
                console.log(item);
                return (
                  <div key={item[0]}>
                  {/* {renders list of tasks to complete} */}
                    {/* <h3>{this.state.Object.keys(toDo).length}</h3> */}
                    <h3>{item[1].task}</h3>
                    {/* <p>Type: {item[1].type}</p> */}
                    <button id={item[0]} onClick={this.deleteItem}>
                      X
                  </button>
                  </div>
                );
              })
            }
          </section>
      </div>
    );
  }
}
// className = { taskClass }

// 1.capture the value with onchange (if only need on the select google)
// 2. use value onsubmit (capture on state) to set className variable



export default App;







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
