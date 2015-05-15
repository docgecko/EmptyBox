// Add BLOG default state
global.BLOG_STATE = {"articles":[{"year":2014,"month":8,"date":20,"published":1408489200000,"title":"React js and flux","isDraft":false,"description":"I am not going to take up your time explaining FLUX in details, that is already very well done on the [Facebook flux site](http://facebook.github.io/flux/). What I want to tell you about is why you would want to consider the flux architecture with React JS","file":"2014_08_20_React-js-and-flux.md","url":"/articles/2014_08_20_React-js-and-flux"}]};

Object.keys(global.SESSION_BLOG_STATE).forEach(function (key) {
  global.BLOG_STATE[key] = global.SESSION_BLOG_STATE[key];
});

require('./../styles/base.css')
require('./../styles/base-layout.css')
require('./../styles/base-components.css')

var React = require('react');
var Page = require('page');
var store = require('./../common/store.js');
var parseArticle = require('./../common/parseArticle');
var Blog = require('./../blog/Blog.jsx');

var render = function () {
  React.render(<Blog/>, document.body);
};

Page('/', function () {
    store.set('currentArticle', null);
    store.set('currentRoute', '/');
    render();
});

Page('/articles/2014_08_20_React-js-and-flux', function (req) {
  document.body.classList.add('article-loading');
  store.set('loadingArticle', '/articles/2014_08_20_React-js-and-flux');
  store.commit();
  require.ensure(['./../posts/2014_08_20_React-js-and-flux.md'], function () {
    document.body.classList.remove('article-loading');
    var content = require('./../posts/2014_08_20_React-js-and-flux.md');
    store.select('articles', {file: '2014_08_20_React-js-and-flux.md'}).edit(parseArticle('2014_08_20_React-js-and-flux.md', content));
    if (store.select('currentArticle').get() !== '2014_08_20_React-js-and-flux.md') { document.body.scrollTop = 0; }
    store.set('currentArticle', '2014_08_20_React-js-and-flux.md');
    store.set('currentRoute', '/articles/2014_08_20_React-js-and-flux');
    store.set('loadingArticle', null);
    store.commit();
    render();
  });
});


Page.start();

if (module.hot) {
    module.hot.accept(["./../posts/2014_08_20_React-js-and-flux.md"], function () {
      Page(location.pathname);
    });
}
