/**
 *  Pts Prestashop Theme Framework for Prestashop 1.6.x
 *
 * @package   pspagebuilder
 * @version   5.0
 * @author    http://www.prestabrain.com
 * @copyright Copyright (C) October 2013 prestabrain.com <@emai:prestabrain@gmail.com>
 *               <info@prestabrain.com>.All rights reserved.
 * @license   GNU General Public License version 2
 * 
 */
(function($) {
	$.fn.WPO_Gallery = function(opts) {
		// default configuration
		var config = $.extend({}, {
		 	key:'',
		 	confirmdel:'Are you sure to remove this?',
		 	savetext:'Save Now',
		 	field:null,
		 	gallery:true,
		 	preview:true,
		 	widgetaction:true
		}, opts);

  		var $this = null;
	 	
	 	function showGalleryModal( $field, layout ){
 				
	 			if( config.widgetaction ){
 					$('#wpo-widgetform').modal().hide();
 				}	
			  	// alert( PS_PAGEbuilder_URL );
			 	var content =  $field.val();

				$('#gallerydialog').remove();
				$('#content').prepend('<div id="gallerydialog" style="padding: 3px 0px 0px 0px;"><iframe src="'+PTS_PAGEBUILDER_FILE_MANAGEMENT+'&modal=true&rad='+Math.random()+'" style="padding:0; margin: 0; display: block; width: 100%; height: 100%;" frameborder="no" scrolling="auto"></iframe></div>');
				$('#gallerydialog').dialog({
						title: 'Image Management',
						close: function (event, ui) {
							if( config.widgetaction ){
								$('#wpo-widgetform').modal().show();
							} 
						},
						open:function(){
						 
							$( "#gallerydialog iframe" ).load( function() { 
							    $( "#gallerydialog iframe" ).contents().find('body').addClass('hideall');
							 	$( "#gallerydialog iframe" ).contents().find('body #nav-sidebar').hide();
							  	$( "#gallerydialog iframe" ).contents().find('body #footer').hide();
							    $( "#gallerydialog iframe" ).contents().find('body #header').hide();

								var images = $( "#gallerydialog iframe" ).contents().find('body .image-item'); 
								images.each( function() {
									var item = this;
									var img = $(item).data('image');
									
									if( content !="" && img !="" && content.indexOf(img) !=-1 ){
										$(item).addClass('active');
									}

									$(item).click( function () {
										
										if( config.gallery == false ){
											images.removeClass('active');
										}

										$(item).toggleClass('active');
									} );
								} ) ;

		
							} );
						},
						 

						bgiframe: true,
						width: 990,
						height: 500,
						resizable: true,
						modal: true
				});

				$('#gallerydialog').dialog({ buttons: [ { text: config.savetext, click: function() { 
					var inpt = '';
				
					$( "#gallerydialog iframe" ).contents().find('body .image-item.active').each( function(){
					 	inpt += $(this).data('image')+",";
					} );

					inpt = inpt.replace(/,$/,''); 
					$field.val( inpt );  
				 	if( config.preview ){
						var cloned = $( "#gallerydialog iframe" ).contents().find('body .image-item.active').clone();
						$("#imagescontent"+config.key).html( cloned );
					}
						
					$( this ).dialog( "close" ); 
				} } ] });

	 	}	


		this.each(function() {  
		 
		 	var $this = $(this);
	 		$rm = $( '<span class="btn btn-danger" id="rmbutton'+config.key+'">x</span>' );
		 	$btn = $( '<hr><div class="btn btn-warning" id="button'+config.key+'">Select Image</div>' );
		 	$content = $( '<div class="images-content row" id="imagescontent'+config.key+'"></div>' );
		 	$this.parent().append( $rm );
	 		$this.parent().append( $content );

		 	$this.parent().append( $btn );

 			$rm.click( function(){ $this.val(''); } );
		 	$content.delegate(".image-item", "click",function(){
 				if( confirm(config.confirmdel) ){
 					var value = $this.val().replace( $(this).attr('data-image'), '' ).replace(/,,/,'').replace(/,$/,'');
 				 	$this.val( value );

 					$(this).remove();
 				}
 			});


		 	var a = $this.val().split(/,/);
		 	if(  $this.val() && a.length > 0 && config.preview ){
		 	 	$.each(a, function(i,v){
		 	 		if( $.trim(v) != "" ){
		 	 	 		var img = $('<div data-image="'+v+'" class="col4 image-item active"><img style="width:100px;height:100px;margin-top:15px;border-radius:10px;border:1px solid #e1e1e1;" src="'+PTS_PAGEBUILDER_FILE_URI+v+'"></div>');
		 	 	 		$content.append(img);
		 	 	 	}
		 	 	} );
		 	 } 


		 	$btn.click( function(){
		 		showGalleryModal(  $this );
		 	} );


		});
	 
		return this;
	};
	
})(jQuery);