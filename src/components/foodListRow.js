import React from 'react';
import { Button, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'

class FoodListRow extends React.Component {
    state = {
        collapse: false
    }

    render() {
        const { food, openFoodToDiaryModal, deleteFood, openEditFoodModal } = this.props;
        return (
            <tr>
                <td onClick={this.toggle}>
                    {food.name}
                    <Button color="success" size="sm" onClick={(event) => openFoodToDiaryModal(food, event)}>+</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <div className="collapseTexts">
                            <p>Energy: {food.energy} kcal / 100 g</p>
                            <p>Fats: {food.fat} g / 100 g</p>
                            <p>Carbohydrates: {food.carb} g / 100 g</p>
                            <p>Proteins: {food.protein} g / 100 g</p>
                        </div>
                        <Button
                            className="collapseButton"
                            outline color="primary"
                            size="sm"
                            onClick={(event) => openEditFoodModal(food, event)}
                        >
                            <FontAwesomeIcon icon={faPen}/>
                        </Button>
                        <Button
                            className="collapseButton"
                            outline color="danger"
                            size="sm"
                            onClick={() => deleteFood(food.id)} 
                        >
                            <FontAwesomeIcon icon={faTrashAlt}/>
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