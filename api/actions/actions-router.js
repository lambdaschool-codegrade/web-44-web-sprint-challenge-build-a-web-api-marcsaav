// Write your "actions" router here!

const express = require('express')

const router = express.Router()

const Actions = require('./actions-model')

const checkActionId = require('./actions-middleware')

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', checkActionId, async (req, res) => {
    try {
        let { id } = req.params
        const action = await Actions.get(id)
        res.status(200).json(action)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router
