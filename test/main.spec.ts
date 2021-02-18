import test from 'japa'
import request from 'supertest'

const BASE_URL = `http://127.0.0.1:8081`

test.group('Main', () => {
  test('it should return 200 when get index', async (assert) => {
    const { status } = await request(BASE_URL).get('/')
    assert.equal(status, 200)
  })
})
