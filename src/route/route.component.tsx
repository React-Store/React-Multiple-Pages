import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { One, Two } from '../app/index'
import { Root } from '../root'

export class GlobalRoute extends React.PureComponent {
  /**
   * Test Render Fn
   *
   * @memberof GlobalRoute
   */
  redirect = () => {
    return <Root />
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" render={this.redirect} />
          <Route exact={true} path="/about.html" component={Two} />
          <Route exact={true} path="/home.html" component={One} />
        </Switch>
      </BrowserRouter>
    )
  }
}
