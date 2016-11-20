var models = require("./models/tables.js");
var striptags = require('striptags');
var ApiCore = (function(){
	return {
		fetchEvents : function(callback){
		  var Events = models["events"];
		  Events.scan().exec(function (err, events) {
		    if(err)
		      console.log(err);
		    callback(events);
		  });	
		},
		fetchOpps : function(callback){
			var Opps = models["opps"];
			Opps.scan().exec(function (err, opps) {
			  if(err)
			    console.log(err);
			  callback(opps);
			});
		},
		fetchFeedResources : function(callback){
			var FR = models["feedresource"];
			FR.scan().exec(function (err, frs) {
			  if(err)
			    console.log(err);
			  frs.forEach(function(entry){
			  		entry.content = striptags(entry.content).toString().substring(0,150);
			  		entry.timestamp = new Date(entry.timestamp).toString().substring(0,15);
			  		entry.sourceName = entry.sourceName.length > 15 ? entry.sourceName.substring(0,15) + ".." : entry.sourceName;
			  });
			  callback(frs);
			});
		}
	};
})();

module.exports = ApiCore;

