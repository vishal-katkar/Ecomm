/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */


 //fix padding-right when open popup
$(document).ready(function(){
		floatHeader();
		$('.magnific_item').magnificPopup({
		  	type:'image',
		  	mainClass: 'mfp-with-zoom', // this class is for CSS animation below

		  	zoom: {
		      enabled: true, // By default it's false, so don't forget to enable it

		      duration: 300, // duration of the effect, in milliseconds
		      easing: 'ease-in-out', // CSS transition easing function

		      // The "opener" function should return the element from which popup will be zoomed in
		      // and to which popup will be scaled down
		      // By defailt it looks for an image tag:
		      opener: function(openerElement) {
		        // openerElement is the element on which popup was initialized, in this case its <a> tag
		        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
		        return openerElement.is('a') ? openerElement : openerElement.find('a');
		    }
		  	},
		  	fixedContentPos: false
		 });



		//gototop
		$(window).scroll(function() {
		    if ($(window).scrollTop() >= 200) {
		        $('#to_top').fadeIn();
		    } else {
		        $('#to_top').fadeOut();
		    }
		});
		$("#to_top").click(function(){
			$("body,html").animate({scrollTop:0	},"normal");
			$("#page").animate({scrollTop:0	},"normal");
				return!1
		});

		$('a[data-toggle="tab"]')
		.on('show.bs.tab', function(e){
			var id = $(e.target).attr('href');
			console.log(id);
			$(id).addClass('tab-loading');
		})
		.on('shown.bs.tab', function (e) {
			var id = $(e.target).attr('href');
			setTimeout(function(){
				$(id).removeClass('tab-loading');
			}, 400);
		})
});

function floatHeader(){
	if($(window).width() >= 1024){
	    if( $("body").hasClass("keep-header") ){
	        $("#header").addClass( "headerFixed" );
	        var hideheight =  $("#header").height()+120; 
	        $("#page").css( "padding-top", $("#header").height() );
	        $(window).scroll(function() {
	            var pos = $(window).scrollTop();
	            if( pos >= hideheight ){
	                $(".header-default").addClass("mini-navbar");
	                $(".header2").addClass("mini-navbar");
	                $(".header3").addClass("mini-navbar");
	            }else {
	               $(".header-default").removeClass("mini-navbar");
	               $(".header2").removeClass("mini-navbar");
	               $(".header3").removeClass("mini-navbar");
	            } 
	        });
	    }
	}else{
		$("#header").removeClass( "headerFixed" );
	}
}