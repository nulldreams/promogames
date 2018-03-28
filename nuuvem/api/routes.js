const controller = require('./controller/nuuvem')

module.exports = (fastify) => {
  fastify.addContentTypeParser('*', (req, done) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      done(data)
    })
  })

  fastify.get('/promocoes/:pagina', controller.promocoes)
}