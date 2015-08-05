(function(global){
  
  global.pageinfo = document.body.getAttribute("data-page");

  var $REG_URL = /((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/g;
  var $keywords = [];
  var $cards;
  var searchBox = $("#search-at-header");

  if(pageinfo === "donate")
    $cards = "#donation-groups .mdl-card";
  else if(pageinfo === "news")
    $cards = "#news .mdl-card";
  else
    $cards = null;

  var alias = [
    ["bago", "ပဲခူး"],
    ["rakhing", "ရခိုင်"],
    ["kayin", "ကရင်"],
    ["ayeyarwaddy", "ဧရာ၀တီ", "ဧရာဝတီ"],
    ["tanaintharyi", "တနင်္သာရီ"]
  ];

  function searchOnPage(){
    var typped = searchBox.val().trim();
    if(!$cards)
      return false;

    if(typped.length === 0){
      if( $keywords.length === 1 ) {
        $($cards).show(400);
        $keywords = [];
      }
      return false;
    }

    $keywords = [];
    typped = typped.toLowerCase();

    typped.split(" ").forEach(function(keyword){
      var aliasfound = false;
      alias.forEach(function(alia){
        if( alia.indexOf(keyword) !== -1 ){
          aliasfound = true;
          $keywords = $keywords.concat(alia);
        }
      });
      if(!aliasfound){
        $keywords.push(keyword);
      }
    });

    var keywords = $keywords.join("|");

    $($cards).each(function(index, card){
      card = $(card);
      if( !card.attr("data-search").match(keywords) ){
        card.hide(400);
      } else {
        card.show(400);
      }
    });

    setTimeout(scrolledCheck, 400);
  }

  global.searchOnPage = searchOnPage;

  $("#search-at-header").on('keyup', searchOnPage);

}(this));
