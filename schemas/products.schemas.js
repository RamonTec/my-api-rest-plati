const Joi = require("joi")

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(20)
const price = Joi.number().integer().min(10)

const schemaProduct = Joi.object({
  name: name.required(),
  price: price.required(),
})

const updateSchemaProduct = Joi.object({
  name: name,
  price: price,
})

const getSchemaProduct = Joi.object({
  id: id.required(),
})

module.exports = { schemaProduct, updateSchemaProduct, getSchemaProduct }
