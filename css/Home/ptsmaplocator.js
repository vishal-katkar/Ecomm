var mapDiv, map, infobox;
jQuery(document).ready(function($) {
	if (typeof mod_id === 'undefined') {
    	mapDiv = $("#directory-main-bar-");
	} else {
		mapDiv = $("#directory-main-bar-"+mod_id+"");
	}
	
	if (typeof markers !== 'undefined') {
		if (markers.length > 1) {
			mapDiv.height(pts_height).gmap3({
				map: {
					options: {
						"draggable": true
						,"mapTypeControl": true
						,"mapTypeId": google.maps.MapTypeId.ROADMAP
						,"scrollwheel": true //Alow scroll zoom in, zoom out
						,"panControl": true
						,"rotateControl": false
						,"scaleControl": true
						,"streetViewControl": true
						,"zoomControl": true
					}
				}
				,marker: {
					values: markers,
					options:{
						draggable: false, //Alow move icon location
					},
					cluster:{
						radius: 20,
						// This style will be used for clusters with more than 0 markers
						0: {
							content: "<div class='cluster cluster-1'>CLUSTER_COUNT</div>",
							width: 90,
							height: 80
						},
						// This style will be used for clusters with more than 20 markers
						20: {
							content: "<div class='cluster cluster-2'>CLUSTER_COUNT</div>",
							width: 90,
							height: 80
						},
						// This style will be used for clusters with more than 50 markers
						50: {
							content: "<div class='cluster cluster-3'>CLUSTER_COUNT</div>",
							width: 90,
							height: 80
						},
						events: {
							click: function(cluster) {
								map.panTo(cluster.main.getPosition());
								map.setZoom(map.getZoom() + 2);
							}
						}
					},
					events: {
						click: function(marker, event, context){
							map.panTo(marker.getPosition());

							infobox.setContent(context.data);
							infobox.open(map,marker);

							// if map is small
							var iWidth = 260;
							var iHeight = 300;
							if((mapDiv.width() / 2) < iWidth ){
								var offsetX = iWidth - (mapDiv.width() / 2);
								map.panBy(offsetX,0);
							}
							if((mapDiv.height() / 2) < iHeight ){
								var offsetY = -(iHeight - (mapDiv.height() / 2));
								map.panBy(0,offsetY);
							}

						}
					}
				}
			},"autofit");
		} else {
			mapDiv.height(pts_height).gmap3({
				map:{
					options:{
						"mapTypeId": google.maps.MapTypeId.ROADMAP
						,"center": [store_json[0]['latitude'], store_json[0]['longitude']]
						,"zoom": 15
						,"maxZoom": 17
					}
				}
				,marker: {
					values: markers,
					options:{
						draggable: false, //Alow move icon location
					},
					cluster:{
						radius: 20,
						// This style will be used for clusters with more than 0 markers
						0: {
							content: "<div class='cluster cluster-1'>CLUSTER_COUNT</div>",
							width: 90,
							height: 80
						},
						// This style will be used for clusters with more than 20 markers
						20: {
							content: "<div class='cluster cluster-2'>CLUSTER_COUNT</div>",
							width: 90,
							height: 80
						},
						// This style will be used for clusters with more than 50 markers
						50: {
							content: "<div class='cluster cluster-3'>CLUSTER_COUNT</div>",
							width: 90,
							height: 80
						},
						events: {
							click: function(cluster) {
								map.panTo(cluster.main.getPosition());
								map.setZoom(map.getZoom() + 2);
							}
						}
					},
					events: {
						click: function(marker, event, context){
							map.panTo(marker.getPosition());

							infobox.setContent(context.data);
							infobox.open(map,marker);

							// if map is small
							var iWidth = 260;
							var iHeight = 300;
							if((mapDiv.width() / 2) < iWidth ){
								var offsetX = iWidth - (mapDiv.width() / 2);
								map.panBy(offsetX,0);
							}
							if((mapDiv.height() / 2) < iHeight ){
								var offsetY = -(iHeight - (mapDiv.height() / 2));
								map.panBy(0,offsetY);
							}

						}
					}
				}
			},"autofit");
		}
	}

	map = mapDiv.gmap3("get");
 	var classhtml = $('html').attr('dir');
	 if(classhtml == 'rtl') {
	  	infobox = new InfoBox({
		   pixelOffset: new google.maps.Size(220, -65),
		   closeBoxURL: '',
		   enableEventPropagation: true,
		   maxWidth: 150,
	  	});
 	} else {
  		infobox = new InfoBox({
		   pixelOffset: new google.maps.Size(-50, -65),
		   closeBoxURL: '',
		   enableEventPropagation: true,
		   maxWidth: 150,
  		});
 	}

	mapDiv.delegate('.infoBox .close','click',function () {
		infobox.close();
	});
	
	$(".box-shop .item-location").click(function(){
		var id = $(this).attr('data-id');
		var marker = $("#directory-main-bar-"+mod_id).gmap3({ get: { id: id } });
		google.maps.event.trigger(marker, 'click');
		map.setCenter(marker.getPosition());
		map.setZoom(15);
	});
});
