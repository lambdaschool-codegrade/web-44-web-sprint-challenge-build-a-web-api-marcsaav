// add middlewares here related to projects

const Projects = require('./projects-model')

const checkProjectId = (req, res, next) => {
    let { id } = req.params
    Projects.get(id)
        .then((project) => {
            if(project) {
                req.project = project
                next()
            } else {
                next({ status: 404, message: 'Project not found'})
            }
        })
}

const checkProjectBody = (req, res, next) => {
    let { description, name } = req.body

    if(!description || !name) {
        next({ status: 400, message: 'Please provide Name, Description of Project Please'})
    } else {
        next()
    }
}

module.exports = {
    checkProjectId,
    checkProjectBody
}