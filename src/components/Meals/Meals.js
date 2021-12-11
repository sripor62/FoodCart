import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealSummary"
import React,{Fragment} from 'react';
const Meals=() => {
    return(<Fragment>
        <MealsSummary/>
        <AvailableMeals/>
        </Fragment>
    );
};
export default Meals;