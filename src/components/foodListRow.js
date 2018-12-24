import React from 'react';
import { Button, Collapse } from 'reactstrap';

class FoodListRow extends React.Component {
    state = {
        collapse: false
    }

    render() {
        const { food, openFoodToDiaryModal, deleteItem, openEditFoodModal } = this.props;
        return (
            <tr>
                <td onClick={this.toggle}>
                    {food.foodName}
                    <Button color="success" size="sm" onClick={(event) => openFoodToDiaryModal(food, event)}>+</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <div className="collapseTexts">
                            <p>Energy: {food.kcal} kcal / 100 g</p>
                            <p>Proteins: {food.prot} g / 100 g</p>
                            <p>Carbohydrates: {food.carb} g / 100 g</p>
                            <p>Fats: {food.fat} g / 100 g</p>
                        </div>
                        <Button
                            className="collapseButton"
                            outline color="primary"
                            size="sm"
                            onClick={(event) => openEditFoodModal(food, event)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="collapseButton"
                            outline color="danger"
                            size="sm"
                            onClick={() => deleteItem(food.id, "listOfFoods")} 
                        >
                            Delete
                        </Button>
                    </Collapse>
                </td>
            </tr>
        );
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }
}

export default FoodListRow;