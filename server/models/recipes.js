let recipes = []

recipes = [
  {
    id: 1,
    userId: 1,
    recipeName: 'Rice and Beans',
    mealType: 'Lunch',
    dishType: 'Nigerian Delicay',
    method: 'this is just a dummy so i can write what ever i want in here ok? thanks you@',
    ingredient: [
      'rice',
      'beans',
    ]
  },
  {
    id: 2,
    userId: 1,
    recipeName: 'Pounded Yam',
    mealType: 'Dinner',
    dishType: 'Nigerian Delicay',
    method: 'this is just a dummy so i can write what ever i want in here ok? thanks you@'
  },
  {
    id: 3,
    userId: 2,
    recipeName: 'Tea and Bread',
    mealType: 'Breakfast',
    dishType: 'Nigerian Delicay',
    method: 'this is just a dummy so i can write what ever i want in here ok? thanks you@'
  }

]

recipes.ingredients = [
  {
    id: 1,
    recipeId: 1,
    ingredient: '2cups of rice and 1cup of beans'
  },
  {
    id: 2,
    recipeId: 1,
    ingredient: 'Five peices of Tomatoes'
  },
  {
    id: 3,
    recipeId: 1,
    ingredient: '2 tea spoons of salt'
  }

  
]

/* let l = recipes.length;
const id = 1 + l;
console.log(id)  */
export default recipes