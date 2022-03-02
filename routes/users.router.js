const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const { limit, offset } = req.query
  if(limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('There are not parameters')
  }
})

router.get('/users/:id' , (req,res)=>{
  const {id} = req.params
  res.json({
    id,
    firstName:'Ramon',
    lastName:'Quijada'
  })
})

module.exports = router
