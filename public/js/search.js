var $REG_URL = /((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/g;

var alias = [
  ["bago", "ပဲခူး"],
  ["rakhing", "ရခိုင်"],
  ["kayin", "ကရင်"],
  ["ayeyarwaddy", "ဧရာ၀တီ", "ဧရာဝတီ"]
];

$("#search-at-header").on('keyup', function(event){
  var that = $(this);
  var typped = that.val();
  typped = typped.toLowerCase();
  var keywords = [];

  typped.split(" ").forEach(function(keyword){
    var aliasfound = false;
    alias.forEach(function(alia){
      if( alia.indexOf(keyword) !== -1 ){
        aliasfound = true;
        keywords = keywords.concat(alia);
      }
    });
    if(!aliasfound){
      keywords.push(keyword);
    }
  });

  keywords = keywords.join("|");

  $("#donation-groups .mdl-card").each(function(index, card){
    card = $(card);
    if( !card.attr("data-search").match(keywords, "gi") ) {
      card.hide(400);
    } else {
      card.show(400);
    }
  });

  $("#new-feed .mdl-card").each(function(index, card){
    card = $(card);
    if( !card.attr("data-search").match(keywords, "gi") ) {
      card.hide(400);
    } else {
      card.show(400);
    }
  });
});
