import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumOnlyInput from './numOnlyInput'

const FoodToListModal = (props) => {

    let buttonContent, title, buttonFunc;
    if(props.editing){
        // Values for title and button
        title = "Edit Food";
        buttonContent = "Edit";
        buttonFunc = props.editFood;
    }
    else{
        title = "Add New Food";
        buttonContent = "Add";
        buttonFunc = props.addFoodToList;
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>{title}</ModalHeader>
            <ModalBody>
                <Table striped>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input type="text" name="name" autoComplete="off" onChange={props.handleInputChange} value={props.food.name}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Energy:</td>
                            <td><NumOnlyInput inputValue={props.food.energy} name="energy" handleInputChange={props.handleInputChange}/></td>
                            <td>kcal / 100 g</td>
                        </tr>
                        <tr>
                            <td>Proteins:</td>
                            <td><NumOnlyInput inputValue={props.food.protein} name="protein" handleInputChange={props.handleInputChange}/></td>
                            <td>g / 100 g</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates:</td>
                            <td><NumOnlyInput inputValue={props.food.carb} name="carb" handleInputChange={props.handleInputChange}/></td>
                            <td>g / 100 g</td>
                        </tr>
                        <tr>
                            <td>Fats:</td>
                            <td><NumOnlyInput inputValue={props.food.fat} name="fat" handleInputChange={props.handleInputChange}/></td>
                            <td>g / 100 g</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>{' '}
                <Button color="primary" onClick={() => {buttonFunc(); props.toggle()}}>{buttonContent}</Button>
            </ModalFooter>
        </Modal>
    );
}

export default FoodToListModal;