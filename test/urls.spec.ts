import test from 'japa'
import { Assert } from 'japa/build/src/Assert'
import supertest from 'supertest'

const BASE_URL = `http://127.0.0.1:3333`

test.group('POST UrlsController', () => {
  test('it should return 400 when try to short without URL in body', async (assert: Assert) => {
    const { status } = await supertest(BASE_URL).post('/encurtador')
    assert.equal(status, 400)
  })

  test('it should return 201 when saved a new url', async (assert) => {
    const data = JSON.stringify({ url: 'http://wisereducacao.com' })
    const { status } = await supertest(BASE_URL).post('/encurtador').send(data)
    assert.equal(status, 201)
  })
})

test.group('GET UrlsController', () => {
  test('it should return 404 response when not find requested url', async (assert: Assert) => {
    const newURL = '/abc123ab'
    const { status } = await supertest(BASE_URL).get(newURL)
    assert.equal(status, 404)
  })
})
