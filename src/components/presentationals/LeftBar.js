import React from 'react'

import DashboardZero from '../../components/containers/DashboardZero'
import DashboardOne from '../../components/containers/DashboardOne'
import DashboardTwo from '../../components/containers/DashboardTwo'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const LeftBar = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard-one">Dashboard One</Link></li>
        <li><Link to="/dashboard-two">Dashboard Two</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={DashboardZero}/>
      <Route path="/dashboard-one" component={DashboardOne}/>
      <Route path="/dashboard-two" component={DashboardTwo}/>
    </div>
  </Router>
)

export default LeftBar
