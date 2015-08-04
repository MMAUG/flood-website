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
	            pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}</br> <b>{point:state}</b>'
	        },

	        series: mapObject.mapseries
	    });
	},
	"chropleth_map_drawer":function(mapObject,cplath_data){
		// Instanciate the map
        $(mapObject.divarea).highcharts('Map', {

            chart : {
                borderWidth : 1
            },

            title : {
                text : 'US population density (/km²)'
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 25
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#EFEFFF'],
                    [0.67, '#4444FF'],
                    [1, '#000022']
                ]
            },

            series : [{
                animation: {
                    duration: 1000
                },
                data : data,
                mapData: Highcharts.maps['countries/us/us-all'],
                joinBy: ['postal-code', 'code'],
                dataLabels: {
                    enabled: true,
                    color: 'white',
                    format: '{point.code}'
                },
                name: 'Population density',
                tooltip: {
                    pointFormat: '{point.code}: {point.value}/km²'
                }
            }]
        });
	}
};
$(function(){

	var page = document.body.getAttribute("data-page");
	  if(page !== "dashboard"){
	    return false;
	  }else{


	  	
		map_current_status_2={};
	  	map_current_status_2.title="လူဦးရေပြမြေပုံ";
	  	map_current_status_2.divarea="#sample_map_2";
	  	map_current_status_2.mapData=geojson_collection_LV1;
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
	        /*map_current_status_2.mapseries.push({
	        	type: 'mappoint',
            	name: 'Cities',
            	color:'#101010',
            	data: [{
	                name: 'Yangon',
	                lat: 628970.515543512,
                	lon: 267319.1785250341

            	}]
	        });*/
			map_current_status_2.mapseries.push(dashboard_arr_parser.decomposer(kunyi_data));
	       
	  	map_maphelper.map_lat_lon_drawer(map_current_status_2);
	  	



	  }
});

var dashboard_arr_parser={"decomposer":function(Array_data){
				kunyi_data=Array_data;

				obj_population_tiles={};
				obj_population_tiles.type='mappoint';
				obj_population_tiles.name="POpulation";
				obj_population_tiles.color="#CE184E";

				arr_population=new Array();
				for(indez in kunyi_data){
					obj_population={};
				/*console.log(kunyi_data[indez].lat);
				console.log(kunyi_data[indez].lon);
				console.log(kunyi_data[indez].total_female);*/
				if((kunyi_data[indez].demographic && kunyi_data[indez].demographic!==null) && (kunyi_data[indez].lat && kunyi_data[indez].lon)){
					obj_population.lat=kunyi_data[indez].lat;
					obj_population.lon=kunyi_data[indez].lon;
					obj_population.state=kunyi_data[indez].state;
					obj_population.name=kunyi_data[indez].township;
					obj_population.total_population=kunyi_data[indez].demographic.total_female+kunyi_data[indez].demographic.total_male;
					obj_population.urban_male=kunyi_data[indez].demographic.urban_total_male;
					obj_population.urban_female=kunyi_data[indez].demographic.urban_total_female;
					obj_population.rual_male=kunyi_data[indez].demographic.rural_total_male;
					obj_population.rual_female=kunyi_data[indez].demographic.rural_total_female;



					arr_population.push(obj_population);
				}
				console.log(obj_population.lon);
				console.log(obj_population.lat);
				//console.log(kunyi_data[indez].total_female)

				//console.log(kunyi_data[indez].demographic);
				//console.log(kunyi_data[indez].demographic.total_female);
				}
				console.log(arr_population);
				obj_population_tiles.data= arr_population;

				return obj_population_tiles;
			}
}
