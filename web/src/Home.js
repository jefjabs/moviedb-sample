import React, { Component } from 'react';
import Api from "./Api.js";
import './Common.css';
import Header from "./Header.js";
import classNames from 'classnames';

class Home extends Component {

	constructor(){
		super();
		this.state = {
			movies:[],
			filteredMovies:[],
			show:false,
		}

		Api.getMovies(function(data){
			this.setState({movies:data,filteredMovies:data});
			if(this.props.match.params.q!="cat" && this.props.match.params.q!=undefined)document.getElementById("search-box").value=this.props.match.params.q.trim();
			if(this.props.match.params.cat!=undefined)document.getElementById("category").value=this.props.match.params.cat;
			this.filterMovies();
			
		}.bind(this));
		this.filterMovies = this.filterMovies.bind(this);
		this.getCasts = this.getCasts.bind(this);
	}

	componentDidMount(){
		setTimeout(function(){
			this.setState({show:true});
		}.bind(this),1000);
	}

	filterMovies(e,catChanged){
		var q = document.getElementById("search-box").value.toLowerCase();
		var cat = document.getElementById("category").value.toLowerCase()
		var filteredMovies=[];
		this.state.movies.map(function(movie,index){
			if(q.trim() == "" || movie.title.toLowerCase().indexOf(q.trim())!=-1){
				if(cat=="all"){
					filteredMovies.push(movie);
				} else {
					var tags = movie.tags.split(",");
					for(var x=0;x<=tags.length;x++){
						if(tags[x]!=undefined && tags[x].trim().toLowerCase()==cat.toLowerCase().trim()){
							filteredMovies.push(movie);
						}
					}
				}
			}
		}.bind(this));
		this.setState({filteredMovies:filteredMovies});
	}

	getCasts(casts){
		var castsArr = [];
		for(var x=0;x<casts.length;x++){
			castsArr.push(casts[x].name);
		}
		return castsArr.slice(0,3).join(",");
	}

	render(){
		return (
			<div style={{opacity:(this.state.show)?1:0}} className={classNames("page-wrapper",{show:this.state.show})}>
				<Header movies={this.state.movies} filterMovies={this.filterMovies}/>
				<div className="movie-listing">
					{this.state.filteredMovies.map(function(movie,index){
						return (
							<div key={index} className="movie">
								<a href={"/movie/"+movie._id}><img src={movie.image} className="movie-image"/></a>
								<div className="movie-info-wrap">
									<h3><a href={"/movie/"+movie._id}>{movie.title}</a></h3>
									<h4>{movie.summary.substring(0,100)}
										{movie.summary.length > 100 &&
												<span>...</span>
										}
									</h4>
									<h5>Cast : {this.getCasts(movie.cast)}</h5>
									<h6>Tags : &nbsp;
										<span className="tags">
											{movie.tags.split(",").slice(0,3).map(function(tag,index){
												return (<span key={index}>{tag}</span>);
											})}
											{movie.tags.split(",").length>3 &&
													<span>...</span>
											}
										</span>
									</h6>
								</div>
							</div>
						);
					}.bind(this))}
					{this.state.filteredMovies.length<=0 &&
							<div>Sorry, No Results Found...</div>
					}
				</div>
			</div>
		);
	}
}

export default Home
