import React, { Component } from 'react';
import Api from "./Api.js";
import './Common.css';
import Header from "./Header.js";
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

class Movie extends Component {
	constructor(){
		super();
		this.state = {
			data:{tags:"",cast:[]},
			show:false,
			movies:[],
			showCastModal:false,
			castName:"",
			castRole:"",
			castFormData:{
				type:"",
				title:"",
				btn:"",
				callback:()=>{}
			}
		}
	}

	componentDidMount(){
		Api.getMovie(this.props.match.params.id,function(data){
			this.setState({data:data});
		}.bind(this));

		Api.getMovies(function(data){
			this.setState({movies:data,filteredMovies:data});
		}.bind(this));

		setTimeout(function(){
			this.setState({show:true});
		}.bind(this),500);
	}

	filterMovies(e,catChanged){
		var q = document.getElementById("search-box").value.toLowerCase();
		if((e.keyCode==13 && q.trim()!="") || catChanged){
			var cat = document.getElementById("category").value.toLowerCase()
			if(q.trim()=="" && cat!="all"){
				window.location.href="/search/cat/"+cat;
			} else if(cat.toLowerCase()=="all"){
				window.location.href="/search/"+q.trim();
			} else {
				window.location.href="/search/"+q.trim()+"/"+cat;
			}
		}
	}

	addCast(){
		this.resetCastForm();
		this.setState({
			showCastModal:true,
			castFormData:{
				title:"Add",
				btn:"Add",
				callback:function(){
					var name = document.getElementById("cast-form-name").value;
					var role = document.getElementById("cast-form-role").value;
					this.state.data.cast.push({name:name,role:role});
					Api.updateMovie(this.state.data._id,this.state.data,function(response){
						this.setState({ showCastModal:false,data:this.state.data});
					}.bind(this));		
				}.bind(this)
			}
		});
	}

	editCast(index){
		this.resetCastForm();
		var cast = this.state.data.cast[index];
		document.getElementById("cast-form-name").value=cast.name;
		document.getElementById("cast-form-role").value=cast.role;
		this.setState({
			showCastModal:true,
			castFormData:{
				title:"Edit",
				btn:"Edit",
				callback:function(){
					var name = document.getElementById("cast-form-name").value;
					var role = document.getElementById("cast-form-role").value;
					this.state.data.cast[index]={name:name,role:role};
					Api.updateMovie(this.state.data._id,this.state.data,function(response){
						this.setState({ showCastModal:false,data:this.state.data});
					}.bind(this));		
				}.bind(this)
			}
		});
	}

	deleteCast(index){
		const options = {
			title: 'Confirm!',
			message: 'Are you sure you want to delete this cast?',
			buttons: [
				{ label: 'Yes',
					onClick: function(){
						var movie = this.state.data;
						movie.cast.splice(index,1);
						Api.updateMovie(this.state.data._id,this.state.data,function(response){
							this.setState({data:this.state.data});
						}.bind(this));	
					}.bind(this)
				},
				{ label: 'No', }
			],
		}

		confirmAlert(options)
	}

	resetCastForm(){
		document.getElementById("cast-form-name").value="";
		document.getElementById("cast-form-role").value="";
	}

	render(){
		const movie = this.state.data;
		return (
			<div style={{opacity:(this.state.show)?1:0}} className={classNames("page-wrapper",{show:this.state.show})}>
				<Header movies={this.state.movies} filterMovies={this.filterMovies}/>
				<div className="movie-wrap movie-page">
					<div className="movie">
						<img src={movie.image} className="movie-image"/>
						<div className="movie-info-wrap">
							<h3><a href={"/movie/"+movie._id}>{movie.title}</a></h3>
							<h4>{movie.summary}</h4>
							<div>
								<h5>Casts : <button className="add-cast-btn" onClick={()=>this.addCast()}>Add Cast</button></h5>
								<div className="casts-wrap">
									{movie.cast.map(function(cast,index){
										return (
											<div className="cast">
												<span className="name">{cast.name} as <span className="role">{cast.role}</span></span>
												<span className="actions">
													<button className="edit-btn" onClick={()=>this.editCast(index)}>Edit</button>
													<button className="delete-btn" onClick={()=>this.deleteCast(index)}>Delete</button>
												</span>
											</div>
										)
									}.bind(this))}
								</div>
							</div>
							<h6>Tags : &nbsp;
								<span className="tags">
									{movie.tags.split(",").map(function(tag,index){
										return (<span key={index}>{tag}</span>);
									})}
								</span>
							</h6>
						</div>
					</div>
				</div>
				<div className={classNames("cast-modal-form",{show:this.state.showCastModal})}>
					<div className="bg" onClick={()=>this.setState({showCastModal:false})}></div>
					<div className="inner">
						<div className="cast-form-wrap">
							<h4>{this.state.castFormData.title} Cast</h4>
							<br/>
							<label>
								<span className="label">Name</span>
								<input id="cast-form-name" type="text"/>
							</label>
							<label>
								<span className="label">Role</span>
								<input id="cast-form-role" type="text"/>
							</label>
							<div className="react-confirm-alert-button-group">
								<button onClick={()=>this.state.castFormData.callback()}>{this.state.castFormData.btn}</button>
								<button onClick={()=>this.setState({showCastModal:false})}>Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie
