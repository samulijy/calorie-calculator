import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FoodToListModal = (props) => {

    //Values to show in input fields, if editing. If adding a new food, input fields are empty.
    let name, energy, protein, carb, fat, buttonContent, title, buttonFunc;
    if(props.editing){
        name = {'value' : props.food.name};
        energy = {'value' : props.food.energy};
        protein = {'value' : props.food.protein};
        carb = {'value' : props.food.carb};
        fat = {'value' : props.food.fat};

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
                            <td><input type="text" name="name" onChange={props.handleInputChange} {...name}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Energy:</td>
                            <td><input type="text" name="energy" onChange={props.handleInputChange} {...energy}/></td>
                            <td>kcal / 100 g</td>
                        </tr>
                        <tr>
                            <td>Proteins:</td>
                            <td><input type="text" name="protein" onChange={props.handleInputChange} {...protein}/></td>
                            <td>g / 100 g</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates:</td>
                            <td><input type="text" name="carb" onChange={props.handleInputChange} {...carb}/></td>
                            <td>g / 100 g</td>
                        </tr>
                        <tr>
                            <td>Fats:</td>
                            <td><input type="text" name="fat" onChange={props.handleInputChange} {...fat}/></td>
                            <td>g / 100 g</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {buttonFunc(); props.toggle()}}>{buttonContent}</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default FoodToListModal;