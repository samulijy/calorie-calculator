import React from 'react';
import { Progress } from 'reactstrap';
import { round, calculateStyle } from '../utils'

const ProgressIndicator = ({dailyGoal, totals}) => {
    const indicators = [
        {
            percent: totals.energy / dailyGoal.energy * 100,
            color: calculateStyle(totals.energy, dailyGoal.energy),
            name: 'Energy'
        },
        {
            percent: totals.fat / dailyGoal.fat * 100,
            color: calculateStyle(totals.fat, dailyGoal.fat),
            name: 'Fats'
        },
        {
            percent: totals.carb / dailyGoal.carb * 100,
            color: calculateStyle(totals.carb, dailyGoal.carb),
            name: 'Carbohydrates'
        },
        {
            percent: totals.protein / dailyGoal.protein * 100,
            color: calculateStyle(totals.protein, dailyGoal.protein),
            name: 'Proteins'
        }
    ]
    return (
        <div>
            {indicators.map(indicator => (
                <>
                    <div className="text-center">{indicator.name}</div>
                    <Progress value={indicator.percent} color={indicator.color}>{round(indicator.percent, 0)}%</Progress>
                </>
            ))}
        </div>
    );
}
 
export default ProgressIndicator;