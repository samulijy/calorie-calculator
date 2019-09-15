import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';
import Diary from './components/diary'
import ListOfFoods from './components/listOfFoods'
import axios from 'axios';
import { isArray } from 'util';

class App extends Component {

  state = {
    listOfFoodsData: [],
    diaryData: [],
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col lg="5">
            <Diary
              data={this.state.diaryData}
              deleteFood={this.deleteDiaryFood}
              // todo edit?
            />
          </Col>
          <Col lg="3">
            <ListOfFoods
              data={this.state.listOfFoodsData}
              addFoodToDiary={this.addFoodToDiary}
              createNewFood={this.createNewFood}
              editFood={this.editFood}
              deleteFood={this.deleteFood}
            /> 
          </Col>
        </Row>  
      </div>
    );
  }

  getData = () => {
    axios.get('http://localhost:3000/foodlist')
    .then(response => {
      if (isArray(response.data)) {
        this.setState({ listOfFoodsData: response.data });
      }
    })
    .then(axios.get('http://localhost:3000/diary/2019-09-08') // TODO hardkoodattu päivä pois
      .then(response => {
        if (isArray(response.data)) {
          this.setState({ diaryData: response.data });
        }
      })
    )
    .catch(err => console.log(err));
  }

  createNewFood = (food) => {
    const body = {
      food
    };
    axios.post(`http://localhost:3000/food`, body)
      .then(() => this.getData());
  }

  editFood = (food) => {
    const body = {
      food
    };
    axios.put(`http://localhost:3000/food`, body)
      .then(() => this.getData());
  }

  deleteFood = (id) => {
    axios.delete(`http://localhost:3000/food/${id}`)
      .then(() => this.getData());
  }

  addFoodToDiary = (data) => {
    axios.post(`http://localhost:3000/diaryfood`, data)
      .then(() => this.getData());
  }

  deleteDiaryFood = (id) => {
    axios.delete(`http://localhost:3000/diaryfood/${id}`)
      .then(() => this.getData());
  }

}

export default App;
