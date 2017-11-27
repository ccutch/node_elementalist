import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import ElementalistStore from './stores/elementalist'
import { Provider } from 'mobx-react'

const elementalistStore = ElementalistStore.create({})
const stores = (window.stores = {
  elementalist: elementalistStore
})

const rootElem = document.getElementById('root')
const root = (
  <Provider {...stores}>
    <App />
  </Provider>
)

render(root, rootElem)
