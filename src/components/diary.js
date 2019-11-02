import React from 'react';
import { Table, Button, Row, Col } from 'reactstrap';
import DiaryRow from './diaryRow';
import { round, calculateStyle } from '../utils'
import DatePickerComponent from './datePickerComponent';
import QuickAddModal from './quickAddModal';
import ProgressIndicator from './progressIndicator'

class Diary extends React.Component {
    state = {
        date: new Date(),
        quickAddModal: false,
        newFood: { // Quick add creates a new food
            name: 'Quick Add',
            energy: 0,
            protein: 0,
            carb: 0,
            fat: 0
        }
    }

    handleDateChange = (date) => {
        this.setState({ date }, () => { this.props.diaryDateChanged(this.state.date) });
    }

    handleInputChange = (event) => {
        let newFood = {};
        switch (event.target.name) {
            case 'energy':
                // When changing energy, we calculate macronutrients automatically.
                // 1/2 carbs, 1/4 fats and 1/4 proteins
                const energy = event.target.value;
                const half = energy / 2;
                const quarter = energy / 4;
                newFood = {
                    ...this.state.newFood,
                    energy,
                    fat: round(quarter / 9, 1),// Fats have about 9 calories per gram
                    protein: round(quarter / 4, 1), // Proteins have about 4 calories per gram
                    carb: round(half / 4, 1), // Carbs have about 4 calories per gram
                }
                break;
            default:
                newFood = {
                    ...this.state.newFood,
                    [event.target.name]: event.target.value
                }
                break;
        }
        this.setState({
            newFood
        });
    }

    quickAddFood = () => {
        const food = {
            name: this.state.newFood.name,
            energy: round(this.state.newFood.energy, 0),
            fat: round(this.state.newFood.fat, 1),
            carb: round(this.state.newFood.carb, 1),
            protein: round(this.state.newFood.protein, 1)
        }
        this.props.quickAddFood(food);
    }

    quickAddToggle = () => {
        this.setState({ quickAddModal: !this.state.quickAddModal });
    }

    openQuickAddModal = () => {
        const newFood = {
            name: 'Quick Add',
            energy: '',
            protein: '',
            carb: '',
            fat: ''
        }
        this.setState({
            newFood
        });
        this.quickAddToggle();
    }

    render() {
        const dailyGoal = {
            energy: 2410,
            protein: 151,
            carb: 301,
            fat: 67
        }
        const calculated = this.props.data.map(food => {
            if (food.weight != null) {
                return {
                    ...food,
                    energy: food.energy / 100 * food.weight,
                    fat: food.fat / 100 * food.weight,
                    carb: food.carb / 100 * food.weight,
                    protein: food.protein / 100 * food.weight
                }
            } else {
                // If weight is null, it is a quick add food.
                return food;
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
                <Row style={{ marginBottom: 5 }}>
                    <Col sm={{ offset: 4 }}>
                        <DatePickerComponent date={this.state.date} handleDateChange={this.handleDateChange} />
                    </Col>
                    <Col>
                        <Button color="primary" onClick={this.openQuickAddModal}>Quick Add</Button>
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
                        <tr className="bolded">
                            <td>Remaining</td>
                            <td className={'text-' + calculateStyle(totals.energy, dailyGoal.energy)}>
                                {round(dailyGoal.energy - totals.energy, 0)}
                            </td>
                            <td className={'text-' + calculateStyle(totals.fat, dailyGoal.fat)}>
                                {round(dailyGoal.fat - totals.fat, 1)}
                            </td>
                            <td className={'text-' + calculateStyle(totals.carb, dailyGoal.carb)}>
                                {round(dailyGoal.carb - totals.carb, 1)}
                            </td>
                            <td className={'text-' + calculateStyle(totals.protein, dailyGoal.protein)}>
                                {round(dailyGoal.protein - totals.protein, 1)}
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <ProgressIndicator
                            dailyGoal={dailyGoal}
                            totals={totals}/>
                    </Col>
                </Row>

                <QuickAddModal
                    modal={this.state.quickAddModal}
                    quickAddFood={this.quickAddFood}
                    toggle={this.quickAddToggle}
                    handleInputChange={this.handleInputChange}
                    food={this.state.newFood}
                />
            </div>
        );
    }
}

export default Diary;