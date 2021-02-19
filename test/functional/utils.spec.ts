import test from 'japa'
import { createRandomCharacters } from '../../utils/generateRandomString'

test.group('UTILS createRandomCharacters', () => {
  test('it should return an error when pass string to min or max', (assert) => {
    assert.ifError(createRandomCharacters('1', '2'))
  })
})
