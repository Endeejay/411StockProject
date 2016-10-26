const storage = require('electron-json-storage');

/*These are fields*/
var portfolio = 'portfolio';
var watch = 'watch';
var transaction = 'transaction';

var portfolioObject = {
  "id" : 1,
  "name" : 'Portfolio'
};
var watchObject = {
  "id" : 2,
  "name" : 'Watch'
};

get(portfolio);
get(watch);

has(portfolio);

var exists = keys(portfolio);
var notExists = keys("yes");
var hi;




    function get(field) {
      storage.get(field, function(error, data){
        if (error) throw error;
          console.log('get: ' + data);
      });
    }

    function set(field, object) {
      storage.set(field, object ,function(error){
        if(error) throw error;
      });
    }
/*has checks if the Field is in the DB.... Field = */
    function has(field){
      storage.has(field, function(error,hasKey){
        if(error) throw error;
        if(hasKey){
          console.log("has");
        }
        else{
          console.log("doesn't have");
        }
      });
    }

    function keys(table){
      storage.keys(function(error, keys) {
        if (error) throw error;
debugger;
        for (var key of keys) {
          console.log('There is a key called: ' + key);
          console.log('table' + table);
          if(key == table){
            return true;
          }
        }
      });
    }

    function remove(field){
      storage.remove(field, function(error) {
        if (error) throw error;
      });
    }

    function clear(){
      storage.clear(function(error){
        if(error) throw error;
      });
    }
