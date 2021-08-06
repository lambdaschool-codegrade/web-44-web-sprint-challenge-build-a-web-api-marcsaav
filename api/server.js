const express = require('express');
const cors = require('cors')
const helmet  = require('helmet')
const server = express();

// Configure your server here

server.use(cors())

server.use(helmet())

server.use(express.json())

// Build your actions router in /api/actions/actions-router.js

const actionsRouter = require('./actions/actions-router')

server.use('/api/actions', actionsRouter)

// Build your projects router in /api/projects/projects-router.js

// const projectsRouter = require('./projects/projects-router')

// server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Hey there! Welcome to my Projects/Actions API </h1>`)
})

// Error-Handling Middleware

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message })
})

// Do NOT `server.listen()` inside this file!

module.exports = server;
