(function(){
  $(".mdl-layout__drawer-button").click(function(event){
    ga('send', 'event', 'button', 'click', 'menu-button-header');
  });

  $("[data-ga]").click(function(event){
    var args = ['send', 'event'];
    args = args.concat( $(this).attr('data-ga').split("|") );
    ga.apply(null, args);
  });
}());
