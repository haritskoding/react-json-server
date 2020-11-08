import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { NavbarComponent } from './Components'
import { Home, Success } from './pages'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <NavbarComponent />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/success" component={Success} />
          </Switch>
        </main>
      </ BrowserRouter>
    )
  }
}
