// Write your "projects" router here!
const express = require('express')

const router = express.Router()

const Projects = require('./projects-model')

const { checkProjectId, checkProjectBody } = require('./projects-middleware')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', checkProjectId, (req, res, next) => {
    try {
        const project = req.project
        res.status(200).json(project)
    } catch(err) {
        next(err)
    }
})

router.post('/', checkProjectBody, async (req, res, next) => {
    try {
        const project = await Projects.insert(req.body)
        res.status(200).json(project)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', checkProjectId, checkProjectBody, async (req, res, next) => {
    try {
        let { id } = req.params
        const project = await Projects.update(id, req.body)
        res.status(200).json(project)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', checkProjectId, async (req, res, next) => {
    try {
        let { id } = req.params
        await Projects.remove(id)
        res.status(200).json()
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', checkProjectId, async (req, res, next) => {
    try {
        let { id } = req.params
        const actions = await Projects.getProjectActions(id)
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

module.exports = router
