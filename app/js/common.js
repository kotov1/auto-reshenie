/*jQuery Number Counter*/
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,
		to: 0,
		speed: 1000,
		refreshInterval: 100,
		decimals: 0,
		formatter: formatter,
		onUpdate: null,
		onComplete: null
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {

$(function() {
    var blockTop = $('.block-8').offset().top+115;
    var CountUpFlag = 0;
    var $window = $(window);
    $window.on('load scroll', function() {
        var top = $window.scrollTop();
        var height = $window.height();
        if (top + height >= blockTop && CountUpFlag == 0) {
            CountUp();
            CountUpFlag = 1;
        }
    });
    function CountUp() {
        $('.timer').each(count); 
    }
});

	
	function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
	}
});







$(function() {

	$(window).scroll(function () {
		if($(window).width() < 575 ) { 

			/*При скролле страницы вниз на 120px показываю кнопку тогл меню*/
			if ($(this).scrollTop() > 120) {	
				$('.mob-menu').css("display", "inline-block");
			} else {

				/*Если тогл меню раскрыто и я скролю страницу вверх, кнопка тогл меню не пропадает*/
				if(!($('.mob-menu').hasClass('on'))){
					$('.mob-menu').css("display", "none");
				}
			}
		}
	});

	/*При ресайзе страницы более чем на 575px скрываю кнопку тогл меню*/
	$(window).resize(function(){
		if($(window).width() > 575 ){
			$('.mob-menu').css("display", "none");
		}
	})

	$(".mob-menu").click(function() {
		$(this).toggleClass("on");

		/*На верху страницы при закрытии тогл меню, скрываю кнопку*/
		if($(window).scrollTop() < 100) {
			$(".mob-menu").css("display", "none");
		}
		return false;
	});


	
	$(".header-nav").click(function (event) {

		if( $(".header-nav").attr('href') ) {
			event.preventDefault();
		}

		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1000);
	});



	$('#js-block-1-slider').slick({
		slidesToShow: 1,
		infinite: true,
		autoplay: true,
		arrows: false
	});
	$('.slick-1-next').on('click', function() {
		$('#js-block-1-slider').slick('slickNext');
	});
	$('.slick-1-prev').on('click', function() {
		$('#js-block-1-slider').slick('slickPrev');
	});

	$('#js-block-7-slider').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		// autoplay: true,
		arrows: false,
		responsive: [
			{
			breakpoint: 991,
			settings: {
				slidesToShow: 2
				}
			},
			{
			breakpoint: 767,
			settings: {
				slidesToShow: 1
				}
			}
		]
	});
	$('.slick-7-next').on('click', function() {
		$('#js-block-7-slider').slick('slickNext');
	});
	$('.slick-7-prev').on('click', function() {
		$('#js-block-7-slider').slick('slickPrev');
	});




});
