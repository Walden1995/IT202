jQuery.githubContent = function(username, repo, callback) {
   jQuery.getJSON('https://api.github.com/repos/'+username+'/'+repo+'/contents?callback=?',callback)
}

jQuery.fn.loadRepoContent = function(username, repo) {
    $.githubContent(username, repo, function(data) {
        var repos = data.data; // JSON Parsing

        $(repos).each(function() {
            if (this.type == "dir") {
                
							var node = $("#listitem").clone();
							
							node.find("A").attr("href",(this.name) + "/");
							node.find("STRONG").text(this.name.substring(0,8));

							$("#list").append(node);
		
            }
        });      
      });
};