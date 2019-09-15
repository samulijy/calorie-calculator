import React from 'react';
import { Table } from 'reactstrap';
import DiaryRow from './diaryRow';

const Diary = (props) => {

    const dailyGoal = {
        energy: 2860,
        protein: 143,
        carb: 358,
        fat: 95
    }

    const totals = {
        energy: props.data.reduce((acc, cur) => (acc + cur.energy), 0),
        protein: props.data.reduce((acc, cur) => (acc + cur.protein), 0),
        carb: props.data.reduce((acc, cur) => (acc + cur.carb), 0),
        fat: props.data.reduce((acc, cur) => (acc + cur.fat), 0)
    }

    return (
        <div className="mainContainer">
            <h3>Food Diary</h3>
            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>Food name</th>
                        <th>Energy (kcal)</th>
                        <th>Prots (g)</th>
                        <th>Carbs (g)</th>
                        <th>Fats (g)</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {props.data.map(food => (
                        <DiaryRow key={food.id} food={food} deleteFood={props.deleteFood}/>
                    ))}
                    
                    <tr className="bolded">
                        <td>Total</td>
                        <td>{totals.energy.toFixed()}</td>
                        <td>{totals.protein.toFixed()}</td>
                        <td>{totals.carb.toFixed()}</td>
                        <td>{totals.fat.toFixed()}</td>
                        <td></td>
                    </tr>
                    <tr className="bolded">
                        <td>Daily goal</td>
                        <td>{dailyGoal.energy.toFixed()}</td>
                        <td>{dailyGoal.protein.toFixed()}</td>
                        <td>{dailyGoal.carb.toFixed()}</td>
                        <td>{dailyGoal.fat.toFixed()}</td>
                        <td ></td>
                    </tr>
                    <tr className="bolded" style={{"color": "red"}}>
                        <td>Remaining</td>
                        <td>{(dailyGoal.energy - totals.energy).toFixed()}</td>
                        <td>{(dailyGoal.protein - totals.protein).toFixed()}</td>
                        <td>{(dailyGoal.carb - totals.carb).toFixed()}</td>
                        <td>{(dailyGoal.fat - totals.fat).toFixed()}</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
 
export default Diary;