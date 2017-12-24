/**
 *  Pts Prestashop Theme Framework for Prestashop 1.6.x
 *
 * @package   ptsthemepanel
 * @version   5.0
 * @author    http://www.prestabrain.com
 * @copyright Copyright (C) October 2013 prestabrain.com <@emai:prestabrain@gmail.com>
 *               <info@prestabrain.com>.All rights reserved.
 * @license   GNU General Public License version 2
 * 
 */
(function($) {
	/**
 	* WPO_Layout Plugin
 	*/

	$.fn.PtsPanelTools = function( opts ) {
		
		/*
		 * default configuration
		 */
		var config = $.extend({ 
				url : '',
				profile:''
			}, {}, opts);

		function fillInputsViaURL( url, file ){

			var gurl  = config.url+file+"-fonts.json?rand"+Math.random();
		//	console.log( gurl );
			$.getJSON( gurl, function(data) {
				 if( data ){
				 	for( var i in data ){
				 		// console.log( data[i] );
			 			var googleFontPath = "//fonts.googleapis.com/css?family="+data[i] +"";
						$('head').append('<link href="'+googleFontPath+'" data-noprefix rel="stylesheet" type="text/css">');

				 	}
				 }
			} );



			$.getJSON( url, function(data) {
			var items = data;

			// console.log( data );
			if( items ){
				$('#formliveedittheme .card').each( function(){
					var i = 0; 

					$("input, select", this).each( function(){
						if( $(this).data('match') ){ 
							if( items[$(this).data('match')] && items[$(this).data('match')][i] ){ 
							
								var el = items[$(this).data('match')][i];
 								$(this).css( el.attr ,"");
								var pf = '';
								var sf = '';
								var bval = el.val;
							 	$(this).val( el.val );

							 	if( el.attr == 'color' || el.attr == 'background-color'  ){
									$(this).css( 'background-color' , '' );
								}

								
								if( el.attr == 'color' || el.attr == 'background-color' ){
									pf = '#';
									$(this).ColorPickerSetColor(el.val );
									$(this).css( 'background-color' , "#" + el.val);
								}else if( el.attr =='background-image' ){
									$("div.active", $(this).parent() ).removeClass('active');
									if( el.val  ) { 
 										var img = $("[data-val='"+el.val+"']", $(this).parent() ); 
 										img.addClass('active') ; 
 										pf='url(';
 										sf= ')';
										bval = img.data( 'image' );
 									}
								}
							 	if( el.val !== '') {
							 		$(this).css(  el.attr ,pf+el.val+sf );
							 		$("html").find( el.selector ).css(  el.attr ,pf+bval+sf );
							 	}
							 	else { 
									 $("html").find( el.selector ).css(  el.attr ,"" );
						 			$(this).css( el.attr ,"");
							 	}
							}
							i++;
						}
					} );
				});
			}
		});
		}
		function saveForm(){

				$("#saved-files").change( function() {
					if( $(this).val() ){  
						$(".show-for-notexisted").hide();
						$(".show-for-existed").show();
					}else {
						$(".show-for-notexisted").show();
						$(".show-for-existed").hide();
					}
					$('html').find("#customize-theme").remove();	

 
					if( $(this).val()  ){



						var url  = config.url+$(this).val()+".json?rand"+Math.random();
						fillInputsViaURL( url ,  $(this).val() );



						if( $(this).val() ){
							var _link = $('<link rel="stylesheet" href="" id="customize-theme">');
							_link.attr('href', config.url+$(this).val()+".css?rand="+Math.random() );

							 // alert(  '{$customizeFolderURL}'+$(this).val()+".css?rand="+Math.random()   );
							$('head').append( _link );
						} 
					}	
				});
		}
		function inputEvents(){
			var $MAINCONTAINER = $("html");

			/**
			 * BACKGROUND-IMAGE SELECTION
			 */
			$(".background-images").each( function(){
				var $parent = this;
				var $input  = $(".input-setting", $parent ); 
				$(".bi-wrapper > div",this).click( function(){
					 $input.val( $(this).data('val') ); 
					 $('.bi-wrapper > div', $parent).removeClass('active');
					 $(this).addClass('active');

					 if( $input.data('selector') ){  
						$($input.data('selector'), $($MAINCONTAINER) ).css( $input.data('attrs'),'url('+ $(this).data('image') +')' );
					 }
				} );
			} ); 

			$(".clear-bg").click( function(){
				var $parent = $(this).parent();
				var $input  = $(".input-setting", $parent ); 
				if( $input.val('') ) {
					if( $parent.hasClass("background-images") ) {
						$('.bi-wrapper > div',$parent).removeClass('active');	
						$($input.data('selector'),$("#main-preview iframe").contents()).css( $input.data('attrs'),'none' );
					}else {
						$input.attr( 'style','' )	
					}
					$($input.data('selector'), $($MAINCONTAINER) ).css( $input.data('attrs'),'inherit' );

				}	
				$input.val('');

				return false;
			} );



			 $('input.input-setting').each( function(){
			 	 var input = this;
			 	 $(input).attr('readonly','readonly');
			 	 $(input).ColorPicker({
			 	 	onChange:function (hsb, hex, rgb) {
			 	 		$(input).css('backgroundColor', '#' + hex);
			 	 		$(input).val( hex );
			 	 		if( $(input).data('selector') ){  
							$( $MAINCONTAINER ).find($(input).data('selector')).css( $(input).data('attrs'),"#"+$(input).val() )
						}
			 	 	}
			 	 });
				} );
			 $('select.input-setting').change( function(){
				var input = this; 
					if( $(input).data('selector') ){  
					var ex = "";	
					$( $MAINCONTAINER ).find($(input).data('selector')).css( $(input).data('attrs'), $(input).val() + ex);
				}
			 } );

			  $( "#formliveedittheme" ).submit( function(){ 
				$('.input-setting').each( function(){
					if( $(this).data("match") ) {
						var val = $(this).data('selector')+"|"+$(this).data('attrs');
						$(this).parent().append('<input type="hidden" name="customize_match['+$(this).data("match")+'][]" value="'+val+'"/>');
					}	 
				} );
				return true; 
			} );
		}
	 	
	 	function themeSkin(){

	 		$("#pts-themelangrtl").change( function(){
	 			if( $(this).val() == 1 ){
	 				$('html').addClass('rtl').removeClass("ltr");
	 				$('html').attr("dir",'rtl');
	 				$("#theme-style").attr('href', $("#theme-style").attr('href').replace("theme.css","rtl-theme.css") );
	 			}else {
	 				$('html').removeClass('rtl').addClass("ltr");
	 				$('html').attr("dir",'ltr');
	 				$("#theme-style").attr('href', $("#theme-style").attr('href').replace("rtl-theme.css","theme.css") );
	 			}
	 		} );
	 		
	 		var skin = $("[name=themeskin]","#pts-panelthemechanger").val() ; 
	 		if( skin ){
	 			$("#pts-panelthemechanger .themecollection > div.theme-"+skin).addClass( 'active');
	 		}

	 		var themeurl = config.url.replace('profiles','themes');

	 		$("#pts-panelthemechanger .themecollection > div").click( function(){ 
	 			$("#pts-panelthemechanger .themecollection > div").removeClass('active');
	 			$(this).addClass( 'active' );
	 			$("[name=themeskin]","#pts-panelthemechanger").val( $(this).data('theme') ); 
	 			
	 		} );

	 		$("#btn-resettheme").click( function(){ 
				$("[name=themeskin]","#pts-panelthemechanger").val( "" ); 
				$("[name=submitLiveThemeChanger]","#pts-panelthemechanger").click();
	 		} );
	 	}
	 	/**
	 	 * initialize every element
	 	 */
		this.each(function() {  
 
 			$('.pts-panelbutton' ).click( function () { 
 	 			$(this).parent().toggleClass('active')
 			} );

  
 			inputEvents();
 			saveForm();
 			themeSkin();

 			$('.pts-tabs a').click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			})
			$('.pts-tabs a:first').tab('show'); 

			$('.pts-panelcollapse .panel-collapse:first').addClass('in');

			if( config.profile ) { 
				var url  = config.url+config.profile+".json?rand"+Math.random(); 
				fillInputsViaURL( url,  config.profile );
			}	
		});
	 
		return this;
	};
	
	$(document).ready( function(){
		var actived = ( $("#saved-files").val() );
		if( actived ){
			 $("#preview-"+actived).addClass( 'active' );
		}
		$("#saved-files").hide();
		$('#profiles-selectors > div').click( function() {
			$("#saved-files").val( $(this).data('value') );
			$('#profiles-selectors > div').removeClass('active');
			$("#saved-files").change();
			$(this).addClass('active');
		} );


		///

		$('.google-font-changer').change( function(){

			var newval = $(this).val();
			var fontFamily = newval;
			var fontFamilyUrl = newval.split(" ").join("+");
			var option = $(this).find('option:selected'); 
			var googleFontPath = "//fonts.googleapis.com/css?family="+fontFamilyUrl+":"+$(option).data('fw') +"";
			$('head').append('<link href="'+googleFontPath+'" data-noprefix rel="stylesheet" type="text/css">');
		} );
	} );

})(jQuery);



 