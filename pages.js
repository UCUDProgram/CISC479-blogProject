var pages = ['home', 'blogPosts', 'indPost',"addPost"];
// var currentPost = ;
var aNewPost = new Post("Blog Test", "David", "This is a test");
var postList = [aNewPost];
var setCounter = 0;
var DB = new Firebase('https://design-patterns-blog.firebaseio.com/');

var currentPageIndex = 0;

var showNextPage = function(){
    document.getElementById(pages[currentPageIndex]).classList.add('hidden');
    currentPageIndex = (currentPageIndex + 1) % pages.length;
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showHomePage = function (){
    var oldIndex = currentPageIndex;
    currentPageIndex = 1;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
    getPosts();
};

var showNewPostPage = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 3;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showIndividualBlogPage = function(ablogPost){
  var oldIndex = currentPageIndex;
    currentPageIndex = 2;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
    
    // console.log(ablogPost);
    
    // console.log(ablogPost.title);
    display_title(ablogPost.title);
    display_author(ablogPost.author);
    display_blog_text(ablogPost.blog);
    // display_Blog_Back();
};
// )};


var pushPost = function(aPost){
    var factRef = DB.child("factory");
    factRef.push().set({title: aPost.title,
                  author: aPost.author, 
                  content:aPost.blog });
};    
    
var getPosts = function(){
    var $div = document.getElementById("blogs");
    $div.innerHTML = '';
    var factoryDB = new Firebase('https://design-patterns-blog.firebaseio.com/factory');
    //  factoryDB.weightById().limitStartTo(1).limitStopTo(2).on('value', function(ss){
        // console.log(ss.val()); 
    //  });
     
     factoryDB.on("value", function(snapshot){
     
     
      var index =0;
      snapshot.forEach(function (childSnapshot){
          var aTitle = childSnapshot.val().title;
          var anAuthor = childSnapshot.val().author;
          var aBlogData = childSnapshot.val().content;
        //   console.log(aTitle);
        //   console.log(anAuthor);
        //   console.log(childSnapshot.val().content);
        renderPost(aTitle,anAuthor, aBlogData);
        index++;
      });
})};   


// Controller

var display_Blog_Button = function(){
    var $nav = document.getElementById("indPost");
    var $button = document.createElement('button');
    $button.innertext = "Blog Home";
    $button.addEventListener('click', showHomePage());
    $nav.appendChild($button);
};

var display_Blog_Back = function(){
    var $nav = document.getElementById("addPost");
    var $button = document.createElement('button');
    $button.innertext = "Blog Home";
    $button.addEventListener('click', showHomePage());
    $nav.appendChild($button);
};

// View
var display_author = function(author){
    var $p = document.getElementById("post_Author")
    $p.innerHTML = '';
    var $txt = document.createElement('p');
    $txt.innerHTML = author;
    $p.appendChild($txt);
};

var display_title = function(title){
    var $p = document.getElementById("post_Title")
    $p.innerHTML = '';
    var $txt = document.createElement('p');
    $txt.innerHTML = title;
    $p.appendChild($txt);
};

var display_blog_text = function(blog){
    var $p = document.getElementById("post_Contents")
    $p.innerHTML = '';
    var $txt = document.createElement('p');
    $txt.innerHTML = blog;
    $p.appendChild($txt);
};

// var display_Patt_Button = function(){
//     var $div = document.getElementById('home')
//     var $button = document.createElement('button');
//     $button.innerText = "Display Pattern";
//     $button.addEventListener('click', updatePage(1));
//     $div.appendChild($button);
// };

// Used to render all the posts the person can select from
var renderPost = function(atitle, aauthor,ablogcontent){
    var $div = document.getElementById("blogs");
    // console.log(atitle);
    // console.log(aauthor);
    // console.log(ablogcontent);
        var $selection = document.createElement('div');
        var $selectTitle = document.createElement('p');
        $selectTitle.innerHTML = atitle;
        var $selectAuthor = document.createElement('p');
        $selectAuthor.innerText = aauthor;
        $selection.appendChild($selectTitle);
        $selection.appendChild($selectAuthor);
        var blog = new Post(atitle,aauthor,ablogcontent);
        console.log(blog);
        $selection.addEventListener('click',function (ev){showIndividualBlogPage(blog)} );
        $div.appendChild($selection);
    // });
};

// Model

var updatePostList = function (aPost){
    postList.add(aPost);
};

var createBlogPost = function(){
    var newName = document.getElementById("nameString").value;
    var newAuthor = document.getElementById("authorString").value;
    var newBlog = document.getElementById("blogText").value;
    var newPost = new Post(newName, newAuthor, newBlog);
    console.log(newPost);
    console.log(postList);
    postList.push(newPost);
    console.log(postList);
    pushPost(newPost);
    showHomePage();
};

var appStart = function(){
    currentPageIndex = 0;

    document.getElementById("postHome").addEventListener('click',showHomePage);
    document.getElementById("postBack").addEventListener('click',showHomePage);
    document.getElementById("addAPost").addEventListener('click',showNewPostPage);   
    document.getElementById("fact_Design_Patt").addEventListener('click',showHomePage);   
    document.getElementById("publishPost").addEventListener('click',createBlogPost);   
};

document.addEventListener('DOMContentLoaded', appStart);