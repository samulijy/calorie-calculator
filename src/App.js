import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';
import Diary from './components/diary'
import ListOfFoods from './components/listOfFoods'
import axios from 'axios';
import { isArray } from 'util';
const moment = require('moment');

class App extends Component {

  state = {
    listOfFoodsData: [],
    diaryData: [],
    diaryDate: new Date()
  }

  componentDidMount() {
    this.getListOfFoods();
    this.getDiary();
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col lg="5">
            <Diary
              data={this.state.diaryData}
              deleteFood={this.deleteDiaryFood}
              diaryDateChanged={this.diaryDateChanged}
            />
          </Col>
          <Col lg="3">
            <ListOfFoods
              data={this.state.listOfFoodsData}
              addFoodToDiary={this.addFoodToDiary}
              createNewFood={this.createNewFood}
              editFood={this.editFood}
              deleteFood={this.deleteFood}
              diaryLength={this.state.diaryData.length}
            />
          </Col>
        </Row>
      </div>
    );
  }

  diaryDateChanged = (date) => {
    this.setState({ diaryDate: date }, this.getDiary);
  }

  getListOfFoods = () => {
    axios.get('http://localhost:3000/foodlist')
      .then(response => {
        if (isArray(response.data)) {
          this.setState({ listOfFoodsData: response.data });
        }
      })
      .catch(err => console.log(err));
  }

  getDiary = () => {
    const date = moment(this.state.diaryDate).format("YYYY-MM-DD");

    axios.get(`http://localhost:3000/diary/${date}`)
      .then(response => {
        if (isArray(response.data)) {
          this.setState({ diaryData: response.data });
        }
      })
      .catch(err => console.log(err));
  }

  createNewFood = (food) => {
    const body = {
      food
    };
    axios.post(`http://localhost:3000/food`, body)
      .then(() => this.getListOfFoods());
  }

  editFood = (food) => {
    const body = {
      food
    };
    axios.put(`http://localhost:3000/food`, body)
      .then(() => this.getListOfFoods());
  }

  deleteFood = (id) => {
    axios.delete(`http://localhost:3000/food/${id}`)
      .then(() => this.getListOfFoods());
  }

  addFoodToDiary = (data) => {
    data.date = this.state.diaryDate;
    axios.post(`http://localhost:3000/diaryfood`, data)
      .then(() => this.getDiary());
  }

  deleteDiaryFood = (id) => {
    axios.delete(`http://localhost:3000/diaryfood/${id}`)
      .then(() => this.getDiary());
  }

}

export default App;
