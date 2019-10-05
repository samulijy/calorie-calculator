import React from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumOnlyInput from './numOnlyInput'
import { round } from '../utils'

const QuickAddModal = (props) => {
    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>
                Quick Add
            </ModalHeader>
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
                            <td><NumOnlyInput inputValue={round(props.food.energy, 0)} name="energy" handleInputChange={props.handleInputChange} /> kcal</td>
                        </tr>
                        <tr>
                            <td>Fats:</td>
                            <td><NumOnlyInput inputValue={round(props.food.fat, 1)} name="fat" handleInputChange={props.handleInputChange} /> g</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates:</td>
                            <td><NumOnlyInput inputValue={round(props.food.carb, 1)} name="carb" handleInputChange={props.handleInputChange} /> g</td>
                        </tr>
                        <tr>
                            <td>Proteins:</td>
                            <td><NumOnlyInput inputValue={round(props.food.protein, 1)} name="protein" handleInputChange={props.handleInputChange} /> g</td>
                        </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>{' '}
                <Button color="primary" onClick={() => { props.quickAddFood(); props.toggle() }}>Add</Button>
            </ModalFooter>
        </Modal>
    );
}

export default QuickAddModal;