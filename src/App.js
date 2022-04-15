import React, { Component } from 'react'

import { Provider } from 'react-redux'

import MainNavigation from './Navigation/index'
import store from './Redux/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    )
  }
}
