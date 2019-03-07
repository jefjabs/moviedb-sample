module.exports = {
	url:"/api/v1",
	getMovies:function(callback){
		fetch(this.url+"/Movie")
		.then(response => response.json())
			.then((data)=>{
				callback(data);
			});
	},
	getMovie:function(id,callback){
		fetch(this.url+"/Movie/"+id)
			.then(response => response.json())
			.then((data)=>{
				callback(data);
			});
	},
	updateMovie:function(id,data,callback){
		fetch(this.url+"/Movie/"+id,
			{
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method:"PUT",
				body:JSON.stringify(data)
			})
			.then(response => response.json())
			.then((data)=>{
				callback(data);
			});

	},
	deleteMovie:function(id){
	},
	createMovie:function(values){
	}
}
