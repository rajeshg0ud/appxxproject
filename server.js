// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)

server.use(router)
server.listen(3033, () => {
    console.log('JSON Server is running')
})

// Export the Server
module.exports = server