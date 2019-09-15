import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const FoodToDiaryModal = (props) => {
    return (    
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>
                {props.food.name}{' '}
                <input type="text" name="weight" onChange={props.handleInputChange} />{' '} g
            </ModalHeader>
            <ModalBody>
                <Table striped>
                    <tbody>
                        <tr>
                            <td>Energy:</td>
                            <td><input disabled value={parseInt(props.food.energy).toFixed()}/> energy</td>
                        </tr>
                        <tr>
                            <td>Proteins:</td>
                            <td><input disabled value={parseInt(props.food.protein).toFixed()}/> g</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates:</td>
                            <td><input disabled value={parseInt(props.food.carb).toFixed()}/> g</td>
                        </tr>
                        <tr>
                            <td>Fats:</td>
                            <td><input disabled value={parseInt(props.food.fat).toFixed()}/> g</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {props.addFoodToDiary(); props.toggle()}}>Add</Button>{' '}
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
 
export default FoodToDiaryModal;