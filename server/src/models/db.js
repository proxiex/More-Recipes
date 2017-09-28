let db = [];


db.recipes = [
  {
    id: 1,
    userId: 1,
    recipeName: 'Rice and Beans',
    mealType: 'Lunch',
    dishType: 'Nigerian Delicay',
    method: 'this is just a dummy so i can write what ever i want in here ok? thanks you@',
    ingreidents: [
      'rice',
      'beans',
      'palm oil'
    ]
  },
  {
    id: 2,
    userId: 1,
    recipeName: 'Pounded Yam',
    mealType: 'Dinner',
    dishType: 'Nigerian Delicay',
    method: 'this is just a dummy so i can write what ever i want in here ok? thanks you@',
    ingreidents: [
      'rice',
      'beans',
      'palm oil'
    ]
  },
  {
    id: 3,
    userId: 2,
    recipeName: 'Tea and Bread',
    mealType: 'Breakfast',
    dishType: 'Nigerian Delicay',
    method: 'this is just a dummy so i can write what ever i want in here ok? thanks you@',
    ingreidents: [
      'rice',
      'beans',
      'palm oil'
    ]   
  }

];

db.review = [
  {
    id: 1,
    userId: 2,
    review: 'i like it i like it i like it i like it i likie it'
  },
  {
    id: 2,
    userId: 1,
    review: 'i like it i like it i like it i like it i likie it'
  },
  {
    id: 3,
    userId: 4,
    review: 'i like it i like it i like it i like it i likie it'
  }
];
/* let l = recipes.length;
const id = 1 + l;
console.log(id)  */
console.log(db.recipes[2]);

export default db;