const express = require('express')
const ProductsService = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')
const { schemaProduct, updateSchemaProduct, getSchemaProduct } = require('../schemas/products.schemas')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.json('I am a filter')
})

router.get('/:id',
  validatorHandler(getSchemaProduct, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      if(product) res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(schemaProduct, 'body'),
  async(req, res) => {
  const body = req.body
  const newProduct = await service.create(body)
  res.status(201).json({
    message: 'created product',
    data: newProduct
  })
  }
)

router.patch('/:id',
  validatorHandler(getSchemaProduct, 'params'),
  validatorHandler(updateSchemaProduct, 'body'),
  async(req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.status(200).json({product})
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id',
  validatorHandler(getSchemaProduct, 'params'),
  async(req, res) => {
    try {
      const { id } = req.params
      const product = await service.delete(id)
      res.status(200).json({product})
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
