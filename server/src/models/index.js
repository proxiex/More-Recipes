'use strict'
const fs = require('fs')
const path = require('path')
// process.env.NODE_ENV = 'production';
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const basename = path.basename(module.filename)
const config = require('../config/config.json')[env] || 'development'
const db = {}

let sequelize
// console.log(config, env)
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  )
}

fs

  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

 db.sequelize
 db.Sequelize

module.exports = db
