jQuery.githubContent = function(username, repo, callback) {
   jQuery.getJSON('https://api.github.com/repos/'+username+'/'+repo+'/contents?callback=?',callback)
}

function loadContent() {
    $.get("folders.JSON",function(data){
        $.each(data, function() {
            var node = $(".sample").clone();
            node.removeClass("sample");
            node.find("A").attr("href",(this.name) + "/");
            node.find("STRONG").text(this.name.substring(0,8));
            $("#list").append(node); 
        });
    });
}
    
        