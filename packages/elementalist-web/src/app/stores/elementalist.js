import { types, flow } from 'mobx-state-tree'

const Element = types.model('Element', {})
const ElementalistStore = types.model('ElementalistStore', {
  loading: true,
  elements: types.optional(types.array(Element), [])
})

export default ElementalistStore
