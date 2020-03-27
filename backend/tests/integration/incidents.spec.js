const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('Incidents', () => { 
  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new ong and create a new incident', async () => {
    const ong = await request(app)
      .post('/ongs')
      .send({
        name: 'Never die',
        email: 'contato@neverdie.com.br',
        whatsapp: '41777777777',
        city: 'Curitiba',
        uf: 'PR'
      })

    const incident = await request(app)
      .post('/incidents')
      .set({Authorization: ong.body.id})
      .send({
        title: 'Case 1',
        description: 'Description detailing the case',
        value: 840
      })


    expect(ong.body).toHaveProperty('id')
    expect(ong.body.id).toHaveLength(8)

    expect(incident.body).toHaveProperty('message')
    expect(incident.body.message).toBe('ok')
  })
})