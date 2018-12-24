import React from 'react';
import {Button} from 'reactstrap'

const DiaryRow = (props) => {
    const {food, deleteItem} = props;
    return (
        <tr>
            <td>{food.foodName}</td>
            <td>{food.kcal.toFixed()}</td>
            <td>{food.prot.toFixed()}</td>
            <td>{food.carb.toFixed()}</td>
            <td>{food.fat.toFixed()}</td>
            <td style={{width:"90px"}}>
                <Button outline color="danger" size="sm" onClick={() => deleteItem(food.id, "diary")}>Delete</Button>
            </td>
        </tr>
    );
}
 
export default DiaryRow;