import React from 'react';
import { Button } from 'reactstrap'
import { round } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'

const DiaryRow = (props) => {
    const { food, deleteFood } = props;
    const name = food.weight != null ? food.name + ' - ' + food.weight + ' g' : food.name;
    return (
        <tr>
            <td>{name}</td>
            <td>{round(food.energy, 0)}</td>
            <td>{round(food.fat, 1)}</td>
            <td>{round(food.carb, 1)}</td>
            <td>{round(food.protein, 1)}</td>
            <td style={{ width: "90px" }}>
                <Button outline color="danger" size="sm" onClick={() => deleteFood(food.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                <Button outline color="secondary" size="sm" ><FontAwesomeIcon icon={faPen} /></Button>
            </td>
        </tr>
    );
}

export default DiaryRow;