import React from 'react';
import { Button } from 'reactstrap'
import { round } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'

const DiaryRow = (props) => {
    const { food, deleteFood } = props;
    return (
        <tr>
            <td>{food.name + ' - ' + food.weight + ' g'}</td>
            <td>{round(food.energy, 0)}</td>
            <td>{round(food.protein, 1)}</td>
            <td>{round(food.carb, 1)}</td>
            <td>{round(food.fat, 1)}</td>
            <td style={{ width: "90px" }}>
                <Button outline color="danger" size="sm" onClick={() => deleteFood(food.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                <Button outline color="primary" size="sm" ><FontAwesomeIcon icon={faPen} /></Button>
            </td>
        </tr>
    );
}

export default DiaryRow;