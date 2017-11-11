/**
* @swagger
* definitions:
*   Signup:
*     type: object
*     properties:
*       email:
*         type: string
*         format: email
*       username:
*         type: string
*       password:
*         type: string
*         format: password
*     example:
*       email: example@example.com
*       username: username
*       password: password
*/

/**
* @swagger
* definitions:
*   Signin:
*     properties:
*       username:
*         type: string
*       password:
*         type: string
*         format: password
*     example:
*       username: example@example.com
*       password: password
*/

/**
* @swagger
* definitions:
*   Recipes:
*     properties:
*       recipeImage:
*         type: string
*       recipeeName:
*         type: string
*       mealType:
*         type: string
*       description:
*         type: string
*       method:
*         type: text
*       ingredients:
*         type: text
*     example:
*       recipeImage:  https://firebasestorage.googleapis.com/v0/b/morerecipes-aed62.appspot.com/o/images%2Fmore-recipes_mmm_1510079669115.jpg?alt=media&token=979f3b37-ec15-479e-a366-a408db3791a4
*       recipeName: Beans and rice
*       mealType: Breakfast
*       description: lorem ipsum bla bla bla
*       ingredients: 3 cups of beans, 1.5 cups of rice
*/

/**
* @swagger
* definitions:
*   Reviews:
*     properties:
*       recipeId:
*         type: integer
*       review:
*         type: string
*     example:
*       review: Cool Stuff!
*/

/**
* @swagger
* definitions:
*   Favorites:
*     properties:
*       recipeId:
*         type: integer
*       userId:
*         type: integer
*/

/**
 * @swagger
 * definitions:
 *  Votes:
 *    properties:
 *      recipeId:
 *        type: integer
 *      userId:
 *        type: integer
 *      upVotes:
 *        type: integer
 *      downVotes:
 *        type: integer
*/

/**
* @swagger
* /api/v1/users/signup:
*   post:
*     tags:
*       - Users
*     description: Creates a new user
*     produces:
*       - application/json
*     parameters:
*       - name: Registration
*         description: Enter your details as shown in the example to the right
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signup'
*     responses:
*       201:
*         description: Successfully Registered
*/

/**
* @swagger
* /api/v1/users/signin:
*   post:
*     tags:
*       - Users
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Signin'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
*   securityDefinations:
*     ApiKeyAuth:
*       type: apiKey
*       in: header
*       name: authorization
* /api/v1/recipes/:
*   post:
*     tags:
*       - Recipes
*     description: Add a new Recipe
*     produces:
*       - application/json
*     security:
*       - ApiKeyAuth: []
*     parameters:
*       - name: Post Recipe
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       201:
*         description: Recipe Added Successfuly
*/

/**
* @swagger
* /api/v1/recipes/{id}:
*   get:
*     tags:
*       - Recipes
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
* /api/v1/recipes/:
*   get:
*     tags:
*       - Recipes
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
* /api/v1/recipes/{id}:
*   put:
*     tags:
*       - Recipes
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
* /api/v1/recipes/{id}:
*   delete:
*     tags:
*       - Recipes
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Recipes'
*     responses:
*       200:
*         description: Successful
*/

// Reviews

/**
* @swagger
* /api/v1/recipes/{id}:
*   post:
*     tags:
*       - Reviews
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Reviews'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
* /api/v1/user/{id}/recipes:
*   post:
*     tags:
*       - Favorites
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Favorites'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
* /api/v1/recipes?vote=up:
*   post:
*     tags:
*       - Votes
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Votes'
*     responses:
*       200:
*         description: Successful
*/

/**
* @swagger
* /api/v1/recipes?vote=down:
*   post:
*     tags:
*       - Votes
*     description: Sign in a registered user
*     produces:
*       - application/json
*     parameters:
*       - name: Login
*         description: Click on the example to the right and fill in your details
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/Votes'
*     responses:
*       200:
*         description: Successful
*/
