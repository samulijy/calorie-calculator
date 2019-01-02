import React from 'react';
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import FoodToListModal from './foodToListModal'
import FoodToDiaryModal from './foodToDiaryModal'
import FoodListRow from './foodListRow'

class ListOfFoods extends React.Component {
    state = {
        foodToListModal: false,
        foodToDiaryModal: false,
        food: {},
        grams: 0,
        newFood: {
            foodName: "",
            kcal: 0,
            prot: 0,
            carb: 0,
            fat: 0
        },
        filterValue: "",
        editing: false
    }

    render(){    
        const foodList = this.props.listOfFoods
            .filter(food => {
                return food.foodName.toLowerCase().indexOf(this.state.filterValue.toLowerCase()) >= 0
            })
            .map(food => {
                return(
                    <FoodListRow
                        key={food.id}
                        food={food}
                        openFoodToDiaryModal={this.openFoodToDiaryModal}
                        deleteItem={this.props.deleteItem}
                        openEditFoodModal={this.openEditFoodModal}
                    />
                ) 
            });
            
        return (
            <div className="listOfFoods">
                <h3>List of Foods</h3>
                <Button color="primary" onClick={this.openFoodToListModal}>Add New Food</Button>
                <input name="searchBar" type="text" placeholder="Search" value={this.state.filterValue} onChange={this.handleInputChange}/>
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
                    grams={this.state.grams}
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
            foodName: "",
            kcal: 0,
            prot: 0,
            carb: 0,
            fat: 0
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
            foodName: food.foodName,
            kcal: 0,
            prot: 0,
            carb: 0,
            fat: 0
        }
        this.setState({ 
            food,
            newFood,
            grams: 0 
        });
        this.useFoodToggle();
    }

    //HTTP requests. Adding and editing foods
    addFoodToDiary = () => {
        const foodName = this.state.newFood.foodName + ' ' + this.state.grams + ' g'
        const newFood = {
            ...this.state.newFood,
            foodName
        }
        this.props.postToDB(newFood, "diary");
    }

    addFoodToList = () => {
        this.props.postToDB(this.state.newFood, "listOfFoods")
    }

    editFood = () => {
        this.props.putToDB(this.state.newFood)
    }

    handleInputChange = (event) => {
        let newFood = {};
        switch(event.target.name){
            case "grams":
                const food = this.state.food;
                const grams = event.target.value;
                newFood = {
                    ...this.state.newFood,
                    kcal: food.kcal / 100 * grams,
                    prot: food.prot / 100 * grams,
                    carb: food.carb / 100 * grams,
                    fat: food.fat / 100 * grams
                }
                this.setState({
                    grams,
                    newFood
                });
                break;
            case "searchBar":
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