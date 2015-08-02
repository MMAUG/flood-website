if(typeof google !== "undefined"){
  var locationJSON = '[{"District":"Shwebo","Township":"Kanbalu","longitude":95.51886,"latitude":23.203053,"Type ":"Township"},{"District":"Katha","Township":"Kawlin","longitude":95.683388,"latitude":23.790258,"Type ":"Township"},{"District":"Shwebo","Township":"Wetlet","longitude":95.788116,"latitude":22.367149,"Type ":"Township"},{"District":"Taunggyi","Township":"Kalaw","longitude":96.55864,"latitude":20.624178,"Type ":"Township"},{"District":"Mohnyin","Township":"Mogaung","longitude":96.940384,"latitude":25.302744,"Type ":"Township"},{"District":"Shwebo","Township":"Ye-U","longitude":95.430489,"latitude":22.76914,"Type ":"Township"},{"District":"Katha","Township":"Indaw","longitude":96.14167,"latitude":24.222515,"Type ":"Township"},{"District":"Shwebo","Township":"Kyunhla","longitude":95.532097,"latitude":23.319637,"Type ":"Township"},{"District":"Kyaukme","Township":"Mongmit","longitude":96.669991,"latitude":23.11422,"Type ":"Township"},{"District":"Monywa","Township":"Monywa","longitude":95.139633,"latitude":22.121679,"Type ":"Township"},{"District":"Monywa","Township":"Ayadaw","longitude":95.447159,"latitude":22.28525,"Type ":"Township"},{"District":"Kyaukme","Township":"Hsipaw","longitude":97.298103,"latitude":22.618938,"Type ":"Township"},{"District":"Shwebo","Township":"Khin-U","longitude":95.62149,"latitude":22.770161,"Type ":"Township"},{"District":"Mohnyin","Township":"Mohnyin","longitude":96.373198,"latitude":24.779057,"Type ":"Township"},{"District":"Monywa","Township":"Budalin","longitude":95.144699,"latitude":22.387771,"Type ":"Township"},{"District":"Maungdaw","Township":"Buthidaung","longitude":92.525,"latitude":20.874975,"Type ":"Township"},{"District":"Hpa-An","Township":"Hlaingbwe","longitude":97.81871,"latitude":17.12574,"Type ":"Township"},{"District":"Sittwe","Township":"Kyauktaw","longitude":92.97282,"latitude":20.843957,"Type ":"Township"},{"District":"Sittwe","Township":"Minbya","longitude":93.27269,"latitude":20.364523,"Type ":"Township"},{"District":"Kale","Township":"Mingin","longitude":94.490858,"latitude":22.879561,"Type ":"Township"},{"District":"Pyinoolwin","Township":"Mogoke","longitude":96.505402,"latitude":22.921391,"Type ":"Township"},{"District":"Pyinoolwin","Township":"Thabeikkyin","longitude":95.97525,"latitude":22.885933,"Type ":"Township"},{"District":"Hpa-An","Township":"Hpapun","longitude":97.444878,"latitude":18.06496,"Type ":"Township"},{"District":"Monywa","Township":"Kani","longitude":94.848469,"latitude":22.43291,"Type ":"Township"},{"District":"Mindat","Township":"Paletwa","longitude":92.854607,"latitude":21.304407,"Type ":"Township"},{"District":"Pyinoolwin","Township":"Singu","longitude":95.998993,"latitude":22.549781,"Type ":"Township"},{"District":"Thayet","Township":"Aunglan","longitude":95.216843,"latitude":19.358553,"Type ":"Township"},{"District":"Thayet","Township":"Aunglan","longitude":93.6028719,"latitude":22.6450258,"Type ":"Township"},{"District":"Kale","Township":"Kale","longitude":94.064594,"latitude":23.186442,"Type ":"Township"},{"District":"Kyaukme","Township":"Mabein","longitude":96.629204,"latitude":23.472921,"Type ":"Township"},{"District":"Minbu","Township":"Minbu","longitude":94.875183,"latitude":20.171606,"Type ":"Township"},{"District":"Sittwe","Township":"Mrauk-U","longitude":93.18844,"latitude":20.591845,"Type ":"Township"},{"District":"Sittwe","Township":"Myebon","longitude":93.373764,"latitude":20.046762,"Type ":"Township"}]'

  var locations = JSON.parse(locationJSON);

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: new google.maps.LatLng(21.9403599, 96.0758242),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) { 
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
      map: map
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i].Township);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}
