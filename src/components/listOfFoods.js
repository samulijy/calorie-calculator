import React from 'react'
import { Table } from 'reactstrap'
import { Button } from 'reactstrap'
import FoodToListModal from './foodToListModal'
import FoodToDiaryModal from './foodToDiaryModal'
import FoodListRow from './foodListRow'
import { round } from '../utils'

class ListOfFoods extends React.Component {
    state = {
        foodToListModal: false,
        foodToDiaryModal: false,
        selectedFood: {}, // We need this to do calculations in handleInputChange
        weight: 0,
        newFood: {
            id: -1,
            name: '',
            energy: 0,
            protein: 0,
            carb: 0,
            fat: 0
        },
        filterValue: '',
        editing: false
    }

    render() {
        const foodList = this.props.data
            .filter(food => {
                return food.name.toLowerCase().indexOf(this.state.filterValue.toLowerCase()) >= 0
            })
            .map(food => {
                return (
                    <FoodListRow
                        key={food.id}
                        food={food}
                        openFoodToDiaryModal={this.openFoodToDiaryModal}
                        deleteFood={this.props.deleteFood}
                        openEditFoodModal={this.openEditFoodModal}
                    />
                )
            });
        return (
            <div className="mainContainer">
                <h3>List of Foods</h3>
                <Button color="primary" onClick={this.openFoodToListModal}>Add New Food</Button>
                <input name="searchBar" type="text" placeholder="Search" autoComplete="off" value={this.state.filterValue} onChange={this.handleInputChange} />
                <Table hover striped bordered size="sm">
                    <tbody className="listOfFoodsTable">
                        {foodList}
                    </tbody>
                </Table>

                <FoodToDiaryModal
                    modal={this.state.foodToDiaryModal}
                    toggle={this.useFoodToggle}
                    food={this.state.newFood}
                    handleInputChange={this.handleInputChange}
                    weight={this.state.weight}
                    addFoodToDiary={this.addFoodToDiary}
                />
                <FoodToListModal
                    modal={this.state.foodToListModal}
                    toggle={this.newFoodToggle}
                    handleInputChange={this.handleInputChange}
                    addFoodToList={this.addFoodToList}
                    editFood={this.editFood}
                    editing={this.state.editing}
                    food={this.state.newFood}
                />
            </div>
        );
    }

    //Modal toggles
    newFoodToggle = () => {
        this.setState({ foodToListModal: !this.state.foodToListModal });
    }

    useFoodToggle = () => {
        this.setState({ foodToDiaryModal: !this.state.foodToDiaryModal });
    }

    //Functions that open modals.
    openFoodToListModal = () => {
        const newFood = {
            name: '',
            energy: '',
            protein: '',
            carb: '',
            fat: ''
        }
        this.setState({
            newFood,
            editing: false
        });
        this.newFoodToggle();
    }

    openEditFoodModal = (food, event) => {
        event.stopPropagation();
        this.setState({
            newFood: food,
            editing: true
        });
        this.newFoodToggle();
    }

    openFoodToDiaryModal = (food, event) => {
        event.stopPropagation();
        const newFood = {
            name: food.name,
            energy: 0,
            protein: 0,
            carb: 0,
            fat: 0
        }
        this.setState({
            selectedFood: food,
            newFood,
            weight: ''
        });
        this.useFoodToggle();
    }

    //HTTP requests. Adding and editing foods
    addFoodToDiary = () => {
        const body = {
            id: this.state.selectedFood.id,
            weight: round(this.state.weight, 0)
        }
        this.props.addFoodToDiary(body);
    }

    addFoodToList = () => {
        const food = {
            name: this.state.newFood.name,
            energy: round(this.state.newFood.energy, 0),
            fat: round(this.state.newFood.fat, 1),
            carb: round(this.state.newFood.carb, 1),
            protein: round(this.state.newFood.protein, 1)
        }
        this.props.createNewFood(food);
    }

    editFood = () => {
        const food = {
            id: this.state.newFood.id,
            name: this.state.newFood.name,
            energy: round(this.state.newFood.energy, 0),
            fat: round(this.state.newFood.fat, 1),
            carb: round(this.state.newFood.carb, 1),
            protein: round(this.state.newFood.protein, 1)
        };
        this.props.editFood(food)
    }

    //Input onChanges
    handleInputChange = (event) => {
        let newFood = {};
        switch (event.target.name) {
            case 'weight':
                const food = this.state.selectedFood;
                const weight = event.target.value;
                newFood = {
                    ...this.state.newFood,
                    energy: food.energy / 100 * weight,
                    protein: food.protein / 100 * weight,
                    carb: food.carb / 100 * weight,
                    fat: food.fat / 100 * weight
                }
                this.setState({
                    weight,
                    newFood
                });
                break;
            case 'searchBar':
                this.setState({ filterValue: event.target.value });
                break;
            default:
                newFood = {
                    ...this.state.newFood,
                    [event.target.name]: event.target.value
                }
                this.setState({
                    newFood
                });
        }
    }
}

export default ListOfFoods;