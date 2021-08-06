// add middlewares here related to actions

const Actions = require('./actions-model')

const checkActionsId = async  (req, res, next) => {
    let { id } = req.params
    Actions.get(id)
        .then((action) => {
            if(action) {
                req.action = action
                next()
            } else {
                next({ status: 404, message: 'Action not found'})
            }
        })
}

module.exports = checkActionsId