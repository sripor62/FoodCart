import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from './MealItem/MealItem';
import { useEffect,useState } from "react";

const AvailableMeals = () => {
  const [meals,setMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  useEffect(() => {
const fetchMeals= async () => {
  setIsLoading(true);
const response=await fetch("https://foodapp-454cb-default-rtdb.firebaseio.com/meals.json");
if(!response.ok)
{
  throw new Error("could not load !!");
  
}
const data=await response.json();
const loadMeals=[];
for(const key in data)
{
  loadMeals.push({
    id:key,
    name:data[key].name,
    description:data[key].description,
    price:data[key].price
  })
}
setMeals(loadMeals);
setIsLoading(false);
};

fetchMeals().catch((error)=> {
  setIsLoading(false);
  setError(error.message);
});

  },[]);
  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
      </section>
  }
  if(error){
    return <section className={classes.MealsError}>
      <p>{error}</p>
      </section>
  }
  
  
  const mealsList = meals.map((meal) => (
    <MealItem 
    key={meal.id}
      name={meal.name}
     id={meal.id}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
