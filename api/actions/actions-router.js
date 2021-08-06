// Write your "actions" router here!

const express = require('express')

const router = express.Router()

const Actions = require('./actions-model')

const { checkActionId, checkActionBody } = require('./actions-middleware')

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', checkActionId, async (req, res, next) => {
    try {
        let { id } = req.params
        const action = await Actions.get(id)
        res.status(200).json(action)
    } catch(err) {
        next(err)
    }
})

router.post('/', checkActionBody, async (req, res, next) => {
    try {
        const action = await Actions.insert(req.body)
        res.status(200).json(action)
    } catch(err) {
        next(err)
    }
})

module.exports = router
