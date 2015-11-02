var request = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');

var shows_url = 'http://www.addic7ed.com/shows.php';

var cacheShows = function(){
    var shows = [];
    var options = {
        uri: shows_url,
        transform: function(body) {
            return cheerio.load(body);
        }
    };
    request(options).then(function($){
        $('h3 > a').each(function(index, element){
            var show = {};
            show.name = $(element).text();
            show.id = /\d+/.exec($(element).attr('href'))[0];
            shows.push(show);
        } );
        data = JSON.stringify(shows);
        saveData(data, 'cache.json');

    });
};
function saveData(data, filepath){
    fs.writeFile(filepath, data, function (err) {
      if (err) return console.log(err);
      console.log('Data Saved');
    });

}
cacheShows();




