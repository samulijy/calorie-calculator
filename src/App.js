import React, { Component } from 'react';
import './App.css';
import Diary from './components/diary'
import ListOfFoods from './components/listOfFoods'
import axios from 'axios';

class App extends Component {

  state = {
    listOfFoods: [],
    diary: [],
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <Diary diary={this.state.diary} putToDB={this.putToDB} deleteItem={this.deleteItem} />
        <ListOfFoods listOfFoods={this.state.listOfFoods} postToDB={this.postToDB} putToDB={this.putToDB} deleteItem={this.deleteItem} />
      </div>
    );
  }

  getData = () => {
    axios.get('http://localhost:3000/listOfFoods')
      .then(response => {
        this.setState({ listOfFoods: response.data });
      })
      .then(axios.get('http://localhost:3000/diary')
        .then(response => {
          this.setState({ diary: response.data });
        })
      )
      .catch(err => console.log(err));
  }

  postToDB = (food, path) => {
    axios.post(`http://localhost:3000/${path}`, food)
      .then(() => this.getData())
  }

  putToDB = (food) => {
    const path = food.id;
    axios.put(`http://localhost:3000/listOfFoods/${path}`, food)
      .then(() => this.getData())
  }

  deleteItem = (id, path) => {
    axios.delete(`http://localhost:3000/${path}/${id}`)
      .then(() => this.getData())
  }

}

export default App;
