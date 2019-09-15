import React from 'react';
import {Button} from 'reactstrap'

const DiaryRow = (props) => {
    const {food, deleteFood} = props;
    return (
        <tr>
            <td>{food.name + ' ' + food.weight}</td>
            <td>{food.energy.toFixed()}</td>
            <td>{food.protein.toFixed()}</td>
            <td>{food.carb.toFixed()}</td>
            <td>{food.fat.toFixed()}</td>
            <td style={{width:"90px"}}>
                <Button outline color="danger" size="sm" onClick={() => deleteFood(food.id)}>Delete</Button>
            </td>
        </tr>
    );
}
 
export default DiaryRow;