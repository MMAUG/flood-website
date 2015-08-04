var map_maphelper={
	"map_lat_lon_drawer":function(mapObject){
			$(mapObject.divarea).highcharts('Map', {

	        title: {
	            text: mapObject.title
	        },

	        mapNavigation: {
	            enabled: true
	        },

	        tooltip: {
	            headerFormat: '',
	            pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}'
	        },

	        series: mapObject.mapseries
	    });
	}
};
$(function(){

	var page = document.body.getAttribute("data-page");
	  if(page !== "dashboard"){
	    return false;
	  }else{
	  	map_current_status={};
	  	map_current_status.title="";
	  	map_current_status.divarea="#sample_map";
	  	map_current_status.mapData=geojson_collection_LV2;
	  	map_current_status.mapseries=[{
	            // Use the gb-all map with no data as a basemap
	            mapData: geojson_collection_LV2,
	            name: 'Basemap',
	            borderColor: '#A0A0A0',
	            nullColor: 'rgba(200, 200, 200, 0.3)',
	            showInLegend: false
	        }, {
	            name: 'Separators',
	            type: 'mapline',
	            data: Highcharts.geojson(geojson_collection_LV2, 'mapline'),
	            color: '#707070',
	            showInLegend: false,
	            enableMouseTracking: false
	        }];

	        map_current_status_2={};
	  	map_current_status_2.title="Map 2";
	  	map_current_status_2.divarea="#sample_map_2";
	  	map_current_status_2.mapData=geojson_collection_LV3;
	  	map_current_status_2.mapseries=[{
	            // Use the gb-all map with no data as a basemap
	            mapData: map_current_status_2.mapData,
	            name: 'Basemap',
	            borderColor: '#A0A0A0',
	            nullColor: 'rgba(200, 200, 200, 0.3)',
	            showInLegend: false
	        }, {
	            name: 'Separators',
	            type: 'mapline',
	            data: Highcharts.geojson(map_current_status_2.mapData, 'mapline'),
	            color: '#707070',
	            showInLegend: false,
	            enableMouseTracking: false
	        }];


map_current_status_3={};
	  	map_current_status_3.title="Provincial Possible flood rate";
	  	map_current_status_3.divarea="#sample_map_3";
	  	map_current_status_3.mapData=geojson_collection_LV1;
	  	map_current_status_3.mapseries=[{
	            // Use the gb-all map with no data as a basemap
	            mapData: map_current_status_3.mapData,
	            name: 'Basemap',
	            borderColor: '#A0A0A0',
	            nullColor: 'rgba(200, 200, 200, 0.3)',
	            showInLegend: false
	        }, {
	            name: 'Separators',
	            type: 'mapline',
	            data: Highcharts.geojson(map_current_status_3.mapData, 'mapline'),
	            color: '#707070',
	            showInLegend: false,
	            enableMouseTracking: false
	        }];
	    //do mapdata binding here


	  	map_maphelper.map_lat_lon_drawer(map_current_status);
	  	map_maphelper.map_lat_lon_drawer(map_current_status_2);
	  	map_maphelper.map_lat_lon_drawer(map_current_status_3);
	  }
});
