// add middlewares here related to actions

const Actions = require('./actions-model')

const checkActionId = async  (req, res, next) => {
    try {
        let { id } = req.params
        const action = await Actions.get(id)
        req.action = action
        next()
    } catch(err) {
        res.status(404).json({ message: err.message })
    }
}

module.exports = checkActionId