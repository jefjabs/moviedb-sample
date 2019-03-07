import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home.js';
import Movie from './Movie.js';

class App extends Component {
  render() {
    return (
		<Router>
			<div>
				<Route path="/"                exact component={Home} />
				<Route path="/search/:q"       exact component={Home} />
				<Route path="/search/:q/:cat"  exact component={Home} />
				<Route path="/test"            exact component={Home} />
				<Route path="/movie/:id"       exact component={Movie} />
			</div>
		</Router>
	);
  }
}

export default App;
