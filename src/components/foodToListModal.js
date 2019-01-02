import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FoodToListModal = (props) => {

    //Values to show in input fields, if editing. If adding a new food, input fields are empty. Amd values for title and button
    let foodName, kcal, prot, carb, fat, buttonContent, title, buttonFunc;
    if(props.editing){
        foodName = {'value' : props.food.foodName};
        kcal = {'value' : props.food.kcal};
        prot = {'value' : props.food.prot};
        carb = {'value' : props.food.carb};
        fat = {'value' : props.food.fat};

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
                            <td><input type="text" name="foodName" onChange={props.handleInputChange} {...foodName}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Energy:</td>
                            <td><input type="text" name="kcal" onChange={props.handleInputChange} {...kcal}/></td>
                            <td>kcal / 100 g</td>
                        </tr>
                        <tr>
                            <td>Proteins:</td>
                            <td><input type="text" name="prot" onChange={props.handleInputChange} {...prot}/></td>
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