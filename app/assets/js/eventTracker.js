(function(){
  $(".mdl-layout__drawer-button").click(function(event){
    ga('send', 'event', 'button', 'click', 'menu-button-header');
  });

  $("[data-ga]").click(function(event){
    var args = ['send', 'event'];
    args.concat( $(this).attr('data-ga').split("|") );
    console.log(args);
    ga.apply(null, args);
  });
}());
