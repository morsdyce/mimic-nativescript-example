// require("nativescript-websockets");
// var connect = require('mimic/nativescript').default;

// var socketCluster = require('socketcluster-client');
// var superagent = require('superagent');
/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/

var Observable = require("data/observable").Observable;
var page;
var context;

exports.pageLoaded = function(args) {  
  page = args.object;
  context = new Observable({
    response: "user@domain.com"
  });
  page.bindingContext = context;
};

exports.issueRequest = function() {
  console.log('REQUEST_START');

  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log('RESPONSE');
      context.set('response', JSON.stringify(response));
      console.log(JSON.stringify(response));
    });

  
};

exports.issueXHR = function() {
  var xhr = new XMLHttpRequest;

  xhr.onload = function() {
    console.log(xhr.responseText);
  }

  xhr.onerror = function(error) {
    console.log(error);
  }

  xhr.open('get', 'https://jsonplaceholder.typicode.com/posts/1', true);

  xhr.send();
}





var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
}

/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;