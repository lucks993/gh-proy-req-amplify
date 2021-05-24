// test-utils.js
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore,applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import  reducer from '../app/root-reducer'
import thunk from 'redux-thunk'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'



function renderRedux(
  ui,
  {
    route = '/',
    initialState = {},
    store = createStore(reducer, initialState,applyMiddleware(thunk)),
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (<Provider store={store}> <Router history={history}>{children}</Router></Provider>
      )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions }
  )
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { renderRedux }
