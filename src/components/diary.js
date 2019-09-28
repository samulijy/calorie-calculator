import React from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import DiaryRow from './diaryRow';
import { round } from '../utils'
import DatePickerComponent from './datePickerComponent';

class Diary extends React.Component {
    state = {
        date: new Date()
    }

    handleDateChange = (date) => {
        this.setState({ date }, () => {this.props.diaryDateChanged(this.state.date)});
    }

    quickAddFood = () => {
        /**
         * TODO:
         * - open modal
         * - create food
         * - add food into db
         * - add to current date
         */
    }

    render() {
        const dailyGoal = {
            energy: 2860,
            protein: 143,
            carb: 358,
            fat: 95
        }
        const calculated = this.props.data.map(food => {
            return {
                ...food,
                energy: food.energy / 100 * food.weight,
                fat: food.fat / 100 * food.weight,
                carb: food.carb / 100 * food.weight,
                protein: food.protein / 100 * food.weight
            }
        })

        const totals = {
            energy: calculated.reduce((acc, cur) => (acc + cur.energy), 0),
            protein: calculated.reduce((acc, cur) => (acc + cur.protein), 0),
            carb: calculated.reduce((acc, cur) => (acc + cur.carb), 0),
            fat: calculated.reduce((acc, cur) => (acc + cur.fat), 0)
        }

        return (
            <div className="mainContainer">
                <Row>
                    <Col>
                        <h3>Food Diary</h3>
                    </Col>
                </Row>
                <Row style={{marginBottom: 5}}>
                    <Col sm={{offset: 4}}>
                        <DatePickerComponent date={this.state.date} handleDateChange={this.handleDateChange}/>
                    </Col>
                    <Col>
                        <Button color="primary" onClick={this.quickAddFood}>Quick Add</Button>
                    </Col>
                </Row>
                <Table striped bordered size="sm">
                    <thead>
                        <tr>
                            <th>Food name</th>
                            <th>Energy (kcal)</th>
                            <th>Fats (g)</th>
                            <th>Carbs (g)</th>
                            <th>Prots (g)</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {calculated.map(food => (
                            <DiaryRow key={food.id} food={food} deleteFood={this.props.deleteFood} />
                        ))}

                        <tr className="bolded">
                            <td>Total</td>
                            <td>{round(totals.energy, 0)}</td>
                            <td>{round(totals.fat, 1)}</td>
                            <td>{round(totals.carb, 1)}</td>
                            <td>{round(totals.protein, 1)}</td>
                            <td></td>
                        </tr>
                        <tr className="bolded">
                            <td>Daily goal</td>
                            <td>{round(dailyGoal.energy, 0)}</td>
                            <td>{round(dailyGoal.fat, 1)}</td>
                            <td>{round(dailyGoal.carb, 1)}</td>
                            <td>{round(dailyGoal.protein, 1)}</td>
                            <td ></td>
                        </tr>
                        <tr className="bolded" style={{ "color": "red" }}>
                            <td>Remaining</td>
                            <td>{round(dailyGoal.energy - totals.energy, 0)}</td>
                            <td>{round(dailyGoal.fat - totals.fat, 1)}</td>
                            <td>{round(dailyGoal.carb - totals.carb, 1)}</td>
                            <td>{round(dailyGoal.protein - totals.protein, 1)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Diary;