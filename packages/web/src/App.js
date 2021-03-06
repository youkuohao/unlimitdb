import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Body from '@react-web/body'
import Loader from '@react-web/async-loader'
import { injectAsyncReducer } from '@react-web/store'
import Spin from '@react-web/spin'
import { match, when } from 'match-when'
import Header from './Header'
import commonStyles from './common/styles'
import Home from './Home'
import Db from './db/Drive'
import NotFound from './NotFound'
import accountReducer, { checkLogin } from './account'
import Account from './account/Account'
import Login from './account/Login'

injectAsyncReducer('account', accountReducer)

class CheckLogin extends Component {

  componentWillMount = () => {
    const {account, checkLogin} = this.props
    if (!account.loginChecked) checkLogin()
  }

  render () {
    const {account, checkLogin} = this.props
    
    if (!account.loginChecked) return <Spin />
    return (
      <Router>
        <div>
          <Header />
          {match(account.logged, {
            [when(true)]: () => 
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/account" component={Account} />
                <Route path="/drive" component={Db} />
                <Route component={NotFound}/>
              </Switch>,
            [when()]: () => <Login />
          })}
        </div>
      </Router>
    )
  }
}

// background-image: linear-gradient(70deg, #4e93e8, #61e4c6)
const styles = StyleSheet.create({
  ...commonStyles
})

const ConnectCheckLogin = connect(
  (store) => ({
    account: store.account,
    postList: store.postList
  }),
  (dispatch) => bindActionCreators({
    checkLogin
  }, dispatch)
)(CheckLogin)

export default ConnectCheckLogin
