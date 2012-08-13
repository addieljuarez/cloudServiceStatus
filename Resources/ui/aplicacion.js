Titanium.include('/ui/logOut.js')
var winApp = Titanium.UI.currentWindow;



var titulo = Titanium.UI.createTextField({
	width:'250dp',
	hintText:'titulo',
	top:0
});
winApp.add(titulo);


var contenido = Ti.UI.createTextField({
	width:'250dp',
	top:'60dp',
	hintText:'contenido',
});

winApp.add(contenido);


var Post = Titanium.UI.createButton({
	title:'post',
	top:'120dp',
	width:'150dp'
});
winApp.add(Post);



//////////////////////////////////////////////////////////////////////////////

//hacer un post

///////////////////////////////////////////////////////////////////////////////
Post.addEventListener('click', function(e){
	
	var Cloud = require('ti.cloud');
	Cloud.debug = true;
	
	
	Cloud.Posts.create({
        content: contenido.value,
        title: titulo.value,
        
       // photo: Titanium.Filesystem.getFile('photo.jpg')
    }, function (e) {
        if (e.success) {
            var post = e.posts[0];
            alert('Success:\\n' +
                'id: ' + post.id + '\\n' +
                'title: ' + post.title + '\\n' +
                'content: ' + post.content + '\\n' +
                'updated_at: ' + post.updated_at);
                
           Titanium.App.Properties.setString('id',post.id);      
        } else {
            alert('Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
        }
    });
	
	
	
});



////////////////////////////////////////////////////////////////////////////////////////////

//ver los post

///////////////////////////////////////////////////////////////////////////////////////////


var showPost = Titanium.UI.createButton({
	title:'mostrar Post',
	top:'200dp',
	width:'150dp',
});
winApp.add(showPost);

showPost.addEventListener('click', function (e){
	var Cloud = require('ti.cloud');
	Cloud.debug =true;
	
    Cloud.Posts.show({
        post_id: Titanium.App.Properties.getString('id'), 
    }, function (e) {
        if (e.success) {
            var post = e.posts[0];
            alert('Success:\\n' +
                'id: ' + post.id + '\\n' +
                'title: ' + post.title + '\\n' +
                'content: ' + post.content + '\\n' +
                'updated_at: ' + post.updated_at);
                
                
                var texto1 = Titanium.UI.createLabel({
                	text:post.id,
                	top:'260dp'
                });
                
                var texto2 = Titanium.UI.createLabel({
                	text:post.title,
                	top:'290dp'
                });
                
                var texto3 = Titanium.UI.createLabel({
                	text:post.content,
                	top:'320dp'
                });
                winApp.add(texto1);
                winApp.add(texto2);
               winApp.add(texto3);
                
                
        } else {
            alert('Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
        }
    });
	
});



