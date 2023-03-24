const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(__dirname + '/db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.post('/api/login', (req, res) => {
  res.jsonp({
    success: true,
    message: "Login successfully!",
    data: {username: 'admin', name: 'super star', id: '001'},
    token: 'random-token-that-will-be-sent-in-the-http-header'
  })
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/users/checkUsername?username=:username': '/api/users?username=:username'
}))

// Returned resources will be wrapped in a body property
router.render = (req, res) => {
  res.jsonp({
    success: true,
    message: "any custom message!",
    data: res.locals.data
  })
}

// Use default router
server.use('/api', router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
