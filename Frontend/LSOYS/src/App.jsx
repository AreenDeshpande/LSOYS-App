// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './Auth';
import FarmerDashboard from './FarmerDashboard';
import TransporterDashboard from './TransporterDashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard/farmer" component={FarmerDashboard} />
        <Route path="/dashboard/transporter" component={TransporterDashboard} />
        <Route path="/" component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
