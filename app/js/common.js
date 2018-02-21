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
	
			if ($(window).width() >= 991) {
				$('.timer').each(count); 
			}

		}
});

	
	function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
	}
});







$(function() {


	$('.call-modal').magnificPopup({
		items: {
			src: '#modal',
			closeBtnInside: true,
			type: 'inline'
		}
	});

	$('.call-modal-tel').magnificPopup({
		items: {
			src: '#modal-tel',
			closeBtnInside: true,
			type: 'inline'
		}
	});


	$('.mfp-image').magnificPopup({
		delegate: 'img',
		type: 'image',
		image: {
			cursor: 'mfp-zoom-out-cur',
			verticalFit: true,
			tError: '<a href="%url%">The image</a> could not be loaded.'
		}
	});


	$(".text-img").click(function(){
		if ($('.images-modal').hasClass('for-images-modal')){

			$('.images-modal').empty().removeClass('for-images-modal');

		}else{

			var mfpImg = $(this).data('mfp');
			$('.images-modal').append('<img src ='+mfpImg+'>');
			$('.images-modal').append('<div id="modal-close"></div>');
			$('.images-modal img').css({"width":"300px","margin":"0","height":"260px","display":"block"});

			$('.images-modal').addClass('for-images-modal');

			$('#modal-close').click(function(){
				$('.images-modal').empty().removeClass('for-images-modal');
				$.magnificPopup.close();
			});
			
		}
	});


	$(document).mouseup(function (e){
		var div = $(".images-modal");
		if ( (!div.is(e.target) && div.has(e.target).length === 0) && div.hasClass('for-images-modal') ) {

			$('.images-modal').empty().removeClass('for-images-modal');
			$.magnificPopup.close();

		}
	});





	$(".mob-menu").click(function() {
		$(this).toggleClass("on");
		return false;
	});



	$(".header-nav-link").click(function (event) {
		
		var id  = $(this).attr('href');

		if ($(id).length) {
			var top = $(id).offset().top -100;
			event.preventDefault();
			$('body,html').animate({scrollTop: top}, 1500);

			if($(window).width() < 575 ){
			$('.mob-menu').toggleClass("on");
		}
		}
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



	if(($('.tel').length > 0)){
		$('.tel').inputmask("+7 (999) 999-99-99");
	}

	$(".block-9-address-close").on("click",function(){
		$(this).children(".block-9-address-close-btn-wrap").prepend('<span class="block-9-address-close-btn">Закрыть</span>');
		$(this).removeClass("block-9-address-close");
		$("img.lazy").show().lazyload();
	});

	$("body").on("click", ".block-9-address-close-btn", function(){
		$(this).parents(".block-9-address").addClass("block-9-address-close");
		$(this).parent(".block-9-address-close-btn-wrap").html("");

	});




	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {	
			$('.scroll-button-wrap').fadeIn();
		} else {
			$('.scroll-button-wrap').fadeOut();
		}
	});

	$('.scroll-button').click(function () {
		$('body,html').animate({scrollTop: 0}, 500);
		return false;
	});	


	$('body').copyright();


	$(".form").submit(function(e) {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			$(".form-button").text("Отправлено");
			$(".form-button").attr("disabled","");
			setTimeout(function() {
				th.trigger("reset");
				$(".form-button").text("Заказать звонок");
				$(".form-button").removeAttr("disabled");
			}, 3000);
		});
		return false;
	});	

	$(".modal-form").submit(function(e) {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			$(".modal-form-button").text("Отправлено");
			$(".modal-form-button").attr("disabled","");
			setTimeout(function() {
				th.trigger("reset");
				$.magnificPopup.close();
				$(".modal-form-button").text("Заказать звонок");
				$(".modal-form-button").removeAttr("disabled");
			}, 3000);
		});
		return false;
	});	
	

});
