class Movie extends models.Base {
	constructor(){
		super();
		this.attributes = {
			"title"   :{"type":"string",required:true},
			"tags"    :{"type":"string",required:true},
			"summary" :{"type":"string",required:true},
			"image"   :{"type":"string",required:true},
			"cast"    :{"type":"json"  ,required:true},
		}
	}
}

module.exports = Movie;
