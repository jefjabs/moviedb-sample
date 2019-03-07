import React, { Component } from 'react';

class Header extends Component {
	constructor(){
		super();
		this.state = {
			movies:[],
			categories:[]
		}
		this.updateCategories = this.updateCategories.bind(this);
	}

	componentDidMount(){
	}

	componentWillReceiveProps(props){
		if(props.movies !=[] && props.movies!=this.state.movies){
			this.state.movies=props.movies;
			this.updateCategories();
		}
	}

	updateCategories(){
		var categories = []
		this.state.movies.map(function(movie,index){
			categories = categories.concat(movie.tags.split(","));
			categories = categories.filter(function(item, pos) {
				return categories.indexOf(item) == pos;
			});
			if((index+1) == this.state.movies.length){
				this.setState({categories:categories});
			}
		}.bind(this));
	}

	render(){
		return (
			<div className="header">
				<a href="/"><img className="logo" src="/logo.png"/></a>
				<input id="search-box" onKeyUp={this.props.filterMovies} className="search-box" type="text" placeholder="Search"/>
				<select id="category" className="categories-selection" onChange={(e)=>this.props.filterMovies(e,true)}>
					<option value="all">All</option>
					{this.state.categories.map(function(cat,index){
						return (<option key={index} value={cat.toLowerCase().trim()}>{cat.trim()}</option>)
					})}
				</select>
			</div>
		)
	}
}

export default Header
