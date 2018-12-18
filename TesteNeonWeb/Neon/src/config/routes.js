import React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"

import App from "../components/App"
import Conversion from "../pages/Conversion"

const Routes = () => (
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={() => <Redirect to="/conversion" /> } />
				<Route path="/conversion" render={() => <Conversion /> } />
				<Redirect to="/" />
      		</Switch>
    	</App>
  </Router>
)

export default Routes