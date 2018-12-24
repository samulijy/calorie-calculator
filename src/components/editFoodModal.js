import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FoodToListModal = (props) => {
    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Edit Food</ModalHeader>
            <ModalBody>
                <Table striped>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td><input type="text" name="foodName" onChange={props.handleInputChange} value={props.food.foodName}/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Energy:</td>
                            <td><input type="text" name="kcal" onChange={props.handleInputChange} value={props.food.kcal}/></td>
                            <td>kcal / 100 g</td>
                        </tr>
                        <tr>
                            <td>Proteins:</td>
                            <td><input type="text" name="prot" onChange={props.handleInputChange} value={props.food.prot}/></td>
                            <td>g / 100 g</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates:</td>
                            <td><input type="text" name="carb" onChange={props.handleInputChange} value={props.food.carb}/></td>
                            <td>g / 100 g</td>
                        </tr>
                        <tr>
                            <td>Fats:</td>
                            <td><input type="text" name="fat" onChange={props.handleInputChange} value={props.food.fat}/></td>
                            <td>g / 100 g</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {props.editFood(); props.toggle()}}>Edit</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default FoodToListModal;