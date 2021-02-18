import test from 'japa'

test.group('Example testing', () => {
  test('assert sum', (assert) => assert.equal(2 + 2, 4))
})
