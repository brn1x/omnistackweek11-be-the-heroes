const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  it('should be able to create a new ONG and create a session (login)', async () => {
    const ong = await request(app)
      .post('/ongs')
      .send({
        name: 'Never die',
        email: 'contato@neverdie.com.br',
        whatsapp: '41777777777',
        city: 'Curitiba',
        uf: 'PR'
      })

    const session = await request(app)
      .post('/sessions')
      .send({
        id: ong.body.id
      })
    
    expect(ong.body).toHaveProperty('id')
    expect(ong.body.id).toHaveLength(8)

    expect(session.body).toHaveProperty('name')
  })
})