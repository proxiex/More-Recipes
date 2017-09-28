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
    ],
    upVotes: 44,
    downVotes: 4
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
    ],
    upVotes: 12,
    downVotes: 0
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
    ],
    upVotes: 400,
    downVotes: 12
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
/* const compareFunc = ((a, b ) => b.upVotes - a.upVotes);
console.log(db.recipes.sort(compareFunc)); */

export default db;