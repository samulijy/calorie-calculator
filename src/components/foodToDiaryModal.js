import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumOnlyInput from './numOnlyInput'
import { round } from '../utils'

const FoodToDiaryModal = (props) => {
    return (    
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>
                {props.food.name}{' '}
                <NumOnlyInput inputValue={props.weight} handleInputChange={props.handleInputChange} name="weight"/>{' '} g
            </ModalHeader>
            <ModalBody>
                <Table striped>
                    <tbody>
                        <tr>
                            <td>Energy:</td>
                            <td><NumOnlyInput disabled inputValue={round(props.food.energy, 0)} name="energy"/> kcal</td>
                        </tr>
                        <tr>
                            <td>Proteins:</td>
                            <td><NumOnlyInput disabled inputValue={round(props.food.protein, 1)} name="protein"/> g</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates:</td>
                            <td><NumOnlyInput disabled inputValue={round(props.food.carb, 1)} name="carb"/> g</td>
                        </tr>
                        <tr>
                            <td>Fats:</td>
                            <td><NumOnlyInput disabled inputValue={round(props.food.fat, 1)} name="fat"/> g</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>{' '}
                <Button color="primary" onClick={() => {props.addFoodToDiary(); props.toggle()}}>Add</Button>
            </ModalFooter>
        </Modal>
    );
}
 
export default FoodToDiaryModal;