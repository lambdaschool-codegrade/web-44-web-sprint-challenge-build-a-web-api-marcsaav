// add middlewares here related to actions

const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const checkActionId = (req, res, next) => {
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

const checkActionBody = (req, res, next) => {
    let { project_id, description, notes } = req.body

    if(!project_id || !description || !notes) {
        next({ status: 400, message: 'Please provide Project ID, Description, and Notes of Action Please'})
    } else {
        Projects.get(project_id)
            .then((project) => {
                if(project) {
                    next()
                } else {
                    next({status:404, message: 'Please provide accurate Project ID'})
                }
            })
    }
}

module.exports = {
    checkActionId,
    checkActionBody
}