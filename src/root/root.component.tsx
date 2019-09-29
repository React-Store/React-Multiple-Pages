import * as React from 'react'

import * as Styles from './root.component.styl'

import { MapDispatchProps, MapOwnProps, MapStateProps } from './root.container'
import { action } from './root.module'

type props = MapDispatchProps &
  MapOwnProps &
  MapStateProps & { action: typeof action }

export class RootComponent extends React.PureComponent<Readonly<props>> {
  componentWillMount() {
    this.props.action.getUserMe()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.list.map((item) => {
          return (
            <div key={item.routerPath} className={Styles.routerItem}>
              <a href={item.routerPath}>{item.routerName}</a>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}
