import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import Header from "./Header";
import MotivationalGif from "./Giphy";
import Footer from "./Footer";

//reference to the root of the database
const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();     // set up our react state
    this.state = {
      task: "",
      term: "",
      img: "",
      bullet: "",
      toDo: {}
    }
  }

  onChange = (event) => {
    this.setState({ 
      term: event.target.value 
    });
  }

  componentDidMount() {
    // creates reference to message in firebase database
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
    const newTask = {
      task: this.state.task,
      type: this.state.bullet,
      datePosted: new Date()
    };
    /* Send the data to Firebase */
    dbRef.push(newTask) //This function clears the form/inputs
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

        <form 
          action="" 
          onSubmit={this.handleSubmit} id="maincontent">
        <div className="userChoice">
          <label htmlFor="task">To Do: </label>
          <input 
          placeholder="Enter To-Do here!"
          type="text"
          onChange={this.handleChange}
          id="task"
          required={true}
          value={this.state.task} />
          <select 
            name="Select bullet type" 
            required={true}
            id="bullet" 
            className="bullet"
            onChange={this.handleType}
            value={this.state.bullet}>
            <option value="" disabled className="placeholder">Select A Type</option>
            <option value="task">Task</option>
            <option value="note">Note</option>
            <option value="event">Event</option>
          </select>
        </div>
        <input 
        type="submit" value="Add Bullet" />
        </form>
        {/* want to show total tasks  */}
        <h3>Total # of Items: {todos.length}</h3>

          <section className="addItem">
            {
              todos.map(([id, item]) => {
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

          <MotivationalGif />

          <Footer />
      </div>
    );
  }
}
export default App;