import test from 'ava'
import * as path from 'path'
import * as elementalist from '../src/elementalist'

const fixture = name => path.resolve(`./tests/fixtures/${name}`)

test('elementalist loaded', t => {
  t.not(elementalist, undefined)
  t.not(elementalist.elements, undefined)
})

test.before(async t => {
  await elementalist.bootstrap()
  // t.pass()
})

test.skip('successfully deploy element', async t => {
  let source = fixture('success-case')
  let name = `test-element-${+new Date()}`

  let manager = await elementalist.elements.create(source, name)
  let element = manager.element

  t.is(element.source, source)
  t.is(element.status, 'deployed')
})

test('deploy two elements concurrently', async t => {
  let source = fixture('success-case')
  let name = `test-element-${+new Date()}`

  let [manager1, manager2] = await Promise.all([
    elementalist.elements.create(source, name + '-1'),
    elementalist.elements.create(source, name + '-2')
  ])
  let element1 = manager1.element
  let element2 = manager2.element

  t.is(element1.source, source)
  t.is(element2.status, 'deployed')
})
