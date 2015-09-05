var jsdom = require('jsdom');
var async = require('async');
var q = require('q');

var baseLink = 'http://tr.anidub.com/page/';

var Parser = function() {
  this.parsedData = [];
}

Parser.prototype.processPages = function(pages) {
  var self = this;
  var defered = q.defer();
  
  async.each(pages, function(num, asyncCb) {
    setTimeout(function() {
      jsdom.env({
        url: baseLink + num,
        scripts: ['http://code.jquery.com/jquery.min.js'],
        done: function(err, w) {
          console.log('page was received: ' + num);
          self.parsePage(err, w, num, asyncCb)
        }
      });
    }, Math.random() * pages.length * 333, num, asyncCb);
  }, function(err) {
    self.finishParse(err, defered);
  });
  return defered.promise;
}

Parser.prototype.parsePage = function(err, w, num, asyncCb) {
  if (!err) {
    var articles = w.$('article');
    for (var i = 0; i < articles.length; i++) {
      this.parseArticle(articles[i], w.$);
    }
    console.log('page was parsed: ' + num);
    asyncCb();
  } else {
    console.log('error happened at the page ' + num);
  }
}

Parser.prototype.parseArticle = function(article, $) {
  var $a = $(article);
  // console.log('started parsing article ' + $a.find('h2 a').text());
  this.parsedData.push({
    title: $a.find('h2 a').text(),
    link: $a.find('h2 a').attr('href'),
    type: $a.find('h2+div a').last().text(),
    typeLink: $a.find('h2+div a').last().attr('href'),
    poster: $a.find('.poster').attr('href'),
    rating: $a.find('.story_h .rcol+.rcol b').text(),
    lastUpdate: $a.find('.story_inf li').eq(1).text().replace('Дата:', ''),
    year: $a.find('.xfinfodata').find('span').eq(0).text(),
    genres: $.map($a.find('.xfinfodata').find('span').eq(1).find('a'), function(item) {
      return $(item).text();
    }),
    series: $a.find('.xfinfodata').find('span').eq(3).text(),
    date: $a.find('.xfinfodata').find('span').eq(4).text()
  });
  // console.log('finished parsing article ' + $a.find('h2 a').text());
}

Parser.prototype.finishParse = function(err, defered) {
  if (!err) {
    console.log('all pages were parsed');
  } else {
    console.log('error somewhere durring parsing');
  }
  defered.resolve();
}

module.exports = Parser;