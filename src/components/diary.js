import React from 'react';
import { Table } from 'reactstrap';
import DiaryRow from './diaryRow';

const Diary = (props) => {

    const dailyGoal = {
        kcal: 2860,
        prot: 143,
        carb: 358,
        fat: 95
    }

    const totals = {
        kcal: props.diary.reduce((acc, cur) => (acc + cur.kcal),0),
        prot: props.diary.reduce((acc, cur) => (acc + cur.prot),0),
        carb: props.diary.reduce((acc, cur) => (acc + cur.carb),0),
        fat: props.diary.reduce((acc, cur) => (acc + cur.fat),0)
    }

    return (
        <div className="diary">
            <h3>Food Diary</h3>
            <Table striped bordered>
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
                    { props.diary.map(food => (
                        <DiaryRow key={food.id} food={food} deleteItem={props.deleteItem}/>
                    ))}
                    
                    <tr className="bolded">
                        <td>Total</td>
                        <td>{totals.kcal.toFixed()}</td>
                        <td>{totals.prot.toFixed()}</td>
                        <td>{totals.carb.toFixed()}</td>
                        <td>{totals.fat.toFixed()}</td>
                        <td></td>
                    </tr>
                    <tr className="bolded">
                        <td>Daily goal</td>
                        <td>{dailyGoal.kcal.toFixed()}</td>
                        <td>{dailyGoal.prot.toFixed()}</td>
                        <td>{dailyGoal.carb.toFixed()}</td>
                        <td>{dailyGoal.fat.toFixed()}</td>
                        <td ></td>
                    </tr>
                    <tr className="bolded" style={{"color": "red"}}>
                        <td>Remaining</td>
                        <td>{(dailyGoal.kcal - totals.kcal).toFixed()}</td>
                        <td>{(dailyGoal.prot - totals.prot).toFixed()}</td>
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