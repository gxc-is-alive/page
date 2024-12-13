(function($) { "use strict";

	
	//Home Sections fit screen	
				
	$(function(){"use strict";
		$('.work-top').css({'height':($(window).height())+'px'});
		$(window).resize(function(){
		$('.work-top').css({'height':($(window).height())+'px'});
		});
	});

	
	//Home Scroll

jQuery(document).ready(function($){
	//change this value if you want to change the speed of the scale effect
	var	scaleSpeed = 0.3,
	//change this value if you want to set a different initial opacity for the .cd-half-block
		boxShadowOpacityInitialValue = 0.7,
		animating = false; 
	
	//check the media query 
	var MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	$(window).on('resize', function(){
		MQ = window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
	});

	//bind the animation to the window scroll event
	triggerAnimation();
	$(window).on('scroll', function(){
		triggerAnimation();
	});

	//move to next/previous section
    $('.cd-vertical-nav .cd-prev').on('click', function(){
    	prevSection();
    });
    $('.cd-vertical-nav .cd-next').on('click', function(){
    	nextSection();
    });
    $(document).keydown(function(event){
		if( event.which=='38' ) {
			prevSection();
			event.preventDefault();
		} else if( event.which=='40' ) {
			nextSection();
			event.preventDefault();
		}
	});

	function triggerAnimation(){
		if(MQ == 'desktop') {
			//if on desktop screen - animate sections
			(!window.requestAnimationFrame) ? animateSection() : window.requestAnimationFrame(animateSection);
		} else {
			//on mobile - remove the style added by jQuery 
			$('.cd-section').find('.cd-block').removeAttr('style').find('.cd-half-block').removeAttr('style');
		}
		//update navigation arrows visibility
		checkNavigation();
	}
	
	function animateSection () {
		var scrollTop = $(window).scrollTop(),
			windowHeight = $(window).height(),
			windowWidth = $(window).width();
		
		$('.cd-section').each(function(){
			var actualBlock = $(this),
				offset = scrollTop - actualBlock.offset().top,
				scale = 1,
				translate = windowWidth/2+'px',
				opacity,
				boxShadowOpacity;

			if( offset >= -windowHeight && offset <= 0 ) {
				//move the two .cd-half-block toward the center - no scale/opacity effect
				scale = 1,
				opacity = 1,
				translate = (windowWidth * 0.5 * (- offset/windowHeight)).toFixed(0)+'px';

			} else if( offset > 0 && offset <= windowHeight ) {
				//the two .cd-half-block are in the center - scale the .cd-block element and reduce the opacity
				translate = 0+'px',
				scale = (1 - ( offset * scaleSpeed/windowHeight)).toFixed(5),
				opacity = ( 1 - ( offset/windowHeight) ).toFixed(5);

			} else if( offset < -windowHeight ) {
				//section not yet visible
				scale = 1,
				translate = windowWidth/2+'px',
				opacity = 1;

			} else {
				//section not visible anymore
				opacity = 0;
			}
			
			boxShadowOpacity = parseInt(translate.replace('px', ''))*boxShadowOpacityInitialValue/20;
			
			//translate/scale section blocks
			scaleBlock(actualBlock.find('.cd-block'), scale, opacity);

			var directionFirstChild = ( actualBlock.is(':nth-of-type(even)') ) ? '-': '+';
			var directionSecondChild = ( actualBlock.is(':nth-of-type(even)') ) ? '+': '-';
			if(actualBlock.find('.cd-half-block')) {
				translateBlock(actualBlock.find('.cd-half-block').eq(0), directionFirstChild+translate, boxShadowOpacity);
				translateBlock(actualBlock.find('.cd-half-block').eq(1), directionSecondChild+translate, boxShadowOpacity);	
			}
			//this is used to navigate through the sections
			( offset >= 0 && offset < windowHeight ) ? actualBlock.addClass('is-visible') : actualBlock.removeClass('is-visible');		
		});
	}

	function translateBlock(elem, value, shadow) {
		var position = Math.ceil(Math.abs(value.replace('px', '')));
		
		if( position >= $(window).width()/2 ) {
			shadow = 0;	
		} else if ( position > 20 ) {
			shadow = boxShadowOpacityInitialValue;
		}

		elem.css({
		    '-moz-transform': 'translateX(' + value + ')',
		    '-webkit-transform': 'translateX(' + value + ')',
			'-ms-transform': 'translateX(' + value + ')',
			'-o-transform': 'translateX(' + value + ')',
			'transform': 'translateX(' + value + ')',
			'box-shadow' : '0px 0px 40px rgba(0,0,0,'+shadow+')'
		});
	}

	function scaleBlock(elem, value, opac) {
		elem.css({
		    '-moz-transform': 'scale(' + value + ')',
		    '-webkit-transform': 'scale(' + value + ')',
			'-ms-transform': 'scale(' + value + ')',
			'-o-transform': 'scale(' + value + ')',
			'transform': 'scale(' + value + ')',
			'opacity': opac
		});
	}

	function nextSection() {
		if (!animating) {
			if ($('.cd-section.is-visible').next().length > 0) smoothScroll($('.cd-section.is-visible').next());
		}
	}

	function prevSection() {
		if (!animating) {
			var prevSection = $('.cd-section.is-visible');
			if(prevSection.length > 0 && $(window).scrollTop() != prevSection.offset().top) {
				smoothScroll(prevSection);
			} else if(prevSection.prev().length > 0 && $(window).scrollTop() == prevSection.offset().top) {
				smoothScroll(prevSection.prev('.cd-section'));
			}
		}
	}

	function checkNavigation() {
		( $(window).scrollTop() < $(window).height()/2 ) ? $('.cd-vertical-nav .cd-prev').addClass('inactive') : $('.cd-vertical-nav .cd-prev').removeClass('inactive');
		( $(window).scrollTop() > $(document).height() - 3*$(window).height()/2 ) ? $('.cd-vertical-nav .cd-next').addClass('inactive') : $('.cd-vertical-nav .cd-next').removeClass('inactive');
	}

	function smoothScroll(target) {
		animating = true;
        $('body,html').animate({'scrollTop': target.offset().top}, 500, function(){ animating = false; });
	}
});

	
	//Navigation	

	$('ul.slimmenu').on('click',function(){
	var width = $(window).width(); 
	if ((width <= 1200)){ 
		$(this).slideToggle(); 
	}	
	});				
	$('ul.slimmenu').slimmenu(
	{
		resizeWidth: '1200',
		collapserTitle: '',
		easingEffect:'easeInOutQuint',
		animSpeed:'medium',
		indentChildren: true,
		childrenIndenter: '&raquo;'
	});	
	
	$(document).ready(function(){"use strict";
		$(".scroll").click(function(event){

			event.preventDefault();

			var full_url = this.href;
			var parts = full_url.split("#");
			var trgt = parts[1];
			var target_offset = $("#"+trgt).offset();
			var target_top = target_offset.top - 60;

			$('html, body').animate({scrollTop:target_top}, 1000);
		});
	});
	


	/* Portfolio Sorting */

	jQuery(document).ready(function($){
		(function ($) { 
		
		
			var container = $('#projects-grid');
			
			
			function getNumbColumns() { 
				var winWidth = $(window).width(), 
					columnNumb = 1;
				
				
				if (winWidth > 1500) {
					columnNumb = 4;
				} else if (winWidth > 1200) {
					columnNumb = 3;
				} else if (winWidth > 900) {
					columnNumb = 2;
				} else if (winWidth > 600) {
					columnNumb = 2;
				} else if (winWidth > 300) {
					columnNumb = 1;
				}
				
				return columnNumb;
			}
			
			
			function setColumnWidth() { 
				var winWidth = $(window).width(), 
					columnNumb = getNumbColumns(), 
					postWidth = Math.floor(winWidth / columnNumb);

			}
			
			$('#portfolio-filter #filter a').click(function () { 
				var selector = $(this).attr('data-filter');
				
				$(this).parent().parent().find('a').removeClass('current');
				$(this).addClass('current');
				
				container.isotope( { 
					filter : selector 
				});
				
				setTimeout(function () { 
					reArrangeProjects();
				}, 300);
				
				
				return false;
			});
			
			function reArrangeProjects() { 
				setColumnWidth();
				container.isotope('reLayout');
			}
			
			
			container.imagesLoaded(function () { 
				setColumnWidth();
				
				
				container.isotope( { 
					itemSelector : '.portfolio-box-1', 
					layoutMode : 'masonry', 
					resizable : false 
				} );
			} );
			
			
		
			
		
			$(window).on('debouncedresize', function () { 
				reArrangeProjects();
				
			} );
			
		
		} )(jQuery);
	} );





	/* DebouncedResize Function */
		(function ($) { 
			var $event = $.event, 
				$special, 
				resizeTimeout;
			
			
			$special = $event.special.debouncedresize = { 
				setup : function () { 
					$(this).on('resize', $special.handler);
				}, 
				teardown : function () { 
					$(this).off('resize', $special.handler);
				}, 
				handler : function (event, execAsap) { 
					var context = this, 
						args = arguments, 
						dispatch = function () { 
							event.type = 'debouncedresize';
							
							$event.dispatch.apply(context, args);
						};
					
					
					if (resizeTimeout) {
						clearTimeout(resizeTimeout);
					}
					
					
					execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
				}, 
				threshold : 150 
			};
		} )(jQuery);




	
  })(jQuery); 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 





	