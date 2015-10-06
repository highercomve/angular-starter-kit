(function(module) {
try {
  module = angular.module('App.partialsPrecompile');
} catch (e) {
  module = angular.module('App.partialsPrecompile', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('example/controller.html',
    '<div class="home-page">\n' +
    '  <h2>{{ helloMessage }}</h2>\n' +
    '  <example-directive></example-directive>  \n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('App.partialsPrecompile');
} catch (e) {
  module = angular.module('App.partialsPrecompile', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('example/directive.html',
    '<!-- here the html code of your directive -->\n' +
    '<div class="example-directive">\n' +
    '  <h3>Hi from a component</h3>\n' +
    '</div>');
}]);
})();
