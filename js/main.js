$(document).ready(function () {
	//filter
	$('.filter__head').click(function () {
		$('.filter__items, .filter__head').addClass('active');
	});
	//propagnation
	$('.filter__close').click(function (e) {
		$('.filter__items, .filter__head').removeClass('active');
	});
	$('.filter__head, .filter__items').click(function (e) {
		e.stopPropagation();
	});
	//popup forma
	$('.header__call .btn').click(function () {
		$('form').each(function () {
			$(this)[0].reset();
		});
		$('.popup.call, .overlay').addClass('visible');
		setTimeout(function () {
			$('.popup.call').find('input').eq(0).focus();
		}, 250);
		var px = window.pageYOffset;
		$('.popup').css('top',px+'px');
	});
	//calendar tab
	$('.g_calendar__filter a').click(function(e){
		e.preventDefault();
		var el = $(this),
			n = el.index();
		el.addClass('current').siblings()
			.removeClass('current')
			.closest('.g_calendar')
			.find('.g_calendar__body')
			.eq(n).addClass('current')
			.siblings().removeClass('current');
		var h5 = $(this).parent().next('h5');
		var scroll = $(this).parent().nextAll('.g_calendar__scroll');
		if(n==0){
			h5.addClass('active');
			scroll.addClass('active');
		}else{
			h5.removeClass('active');
			scroll.removeClass('active');
		}
	});
	//calendar slider
	if($('*').is('.g_calendar__slider')){
		var sl_calendar = $('.g_calendar__slider').lightSlider({
			item: 1,
			controls:false,
			pager: false,
			adaptiveHeight: true,
			mode: 'fade',
			speed: 1300
		});
	}
	$('.g_calendar__2filter .g_calendar__row_btns a').click(function(e){
		e.preventDefault();
		var n = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		sl_calendar.goToSlide(n);
	});
	$(".g_calendar__body").scroll(function () {
		var scroll = $(this).prevAll('.g_calendar__scroll'),
			body = $(this);
		scroll.scrollLeft(body.scrollLeft());
	});
	$(".g_calendar__scroll").scroll(function () {
		var scroll = $(this),
			body = scroll.nextAll('.g_calendar__body');
		body.scrollLeft(scroll.scrollLeft());
	});
	//popups
	$('._open_pop').click(function(e){
		e.preventDefault();
		$('form').each(function() {
            $(this)[0].reset();
        });
		var name = $(this).data('name');
		setTimeout(function() {
            $('.popup').find('input').eq(0).focus();
        }, 1000);
		if(name=="certificate"){
			var text = $(this).closest('.g_block').find('h3').text();
			$('.popup._'+name).find('h2').text(text);
		}
		$('.overlay, .popup._'+name).addClass('visible');
		var px = window.pageYOffset;
		$('.popup').css('top',px+'px');
	});
	$('.g_calendar__row a').click(function (e){
		if(!$(this).closest('.g_calendar__2filter').length){
			e.preventDefault();
		}
	});
	$('.g_calendar__row span a').click(function (e){
		e.preventDefault();
		$('form').each(function () {
			$(this)[0].reset();
		});
		$('.popup._quest, .overlay').addClass('visible');
		setTimeout(function () {
			$('.popup._quest').find('input').eq(0).focus();
		}, 250);
		if(!$(this).closest('.s_main__calendar').length){
			var time = $(this).text(),
			day = $(this).closest('.s_main').find('.g_calendar__row_btns a.active').html();
			$('.popup__date').find('span').html(day);
			$('.popup__date').find('b').text(time);
		}else{
			var time = $(this).text(),
				quest = $(this).closest('.g_calendar__row').find('h5').html(),
				day = $(this).closest('.s_main').find('.g_calendar__2filter a.active').html(),
				month = $(this).closest('.s_main').find('.g_calendar__2filter_month').text();
			$('.popup__date').find('span').html(day);
			var cut_day = $('.popup__date').find('small').text(),
				full_day = '';
			switch(cut_day){
				case 'пн':
					full_day = 'Понедельник';
					break;
				case 'вт':
					full_day = 'Вторник';
					break;
				case 'ср':
					full_day = 'Среда';
					break;
				case 'чт':
					full_day = 'Четверг';
					break;
				case 'пт':
					full_day = 'Пятница';
					break;
				case 'сб':
					full_day = 'Суббота';
					break;
				case 'вс':
					full_day = 'Воскресенье';
					break;
				default:
					full_day = 'Не выбран день';
					break;
			}
			quest = quest.substring(0, quest.indexOf('<'));
			$('.popup__date').find('small').text(full_day);
			$('.popup__date').find('small').before(' '+month);
			$('.popup__date').find('b').text(time);
			$('.popup._quest').find('h2').text(quest);
		}
		var px = window.pageYOffset;
		$('.popup').css('top',px+'px');
	});
	$('.close_pop, .close_btn, .overlay').click(function () {
		$('.popup, .overlay').removeClass('visible');
		$('.popup').find('.error').removeClass('error');
	});
	//hamb
	$('.header__hamb').click(function () {
		$('.header__links').addClass('visible')
	});
	$('.header__close').click(function () {
		$('.header__links').removeClass('visible')
	});
	//mask
	$('input[name="phone"]').mask('+7 (999) 999-99-99');
	//validate
	$("form").each(function (index) {
		var it = $(this);
		it.validate({
			rules: {
				name: {
					required: true
				},
				phone: {
					required: true
				},
				mail: {
					required: true
				},
				message: {
					required: false
				}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				$.ajax({
					type: "POST",
					url: "../mail.php",
					data: it.serialize()
				}).done(function () {
					$('.popup').removeClass('visible');
					$('.popup.thnx, .overlay').addClass('visible');
					setTimeout(function () {
						if ($('.popup.thnx').hasClass('visible')) {
							$('.popup.thnx, .overlay').removeClass('visible');
						}
					}, 2800);
				});
				return false;
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('error');
			}
		});
	});
	if ($('*').is('#map')) {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.6700, -73.9400), // New York

			// How you would like to style the map.
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [{
					"saturation": 36
				}, {
					"color": "#000000"
				}, {
					"lightness": 40
				}]
			}, {
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [{
					"visibility": "on"
				}, {
					"color": "#000000"
				}, {
					"lightness": 16
				}]
			}, {
				"featureType": "all",
				"elementType": "labels.icon",
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 17
				}, {
					"weight": 1.2
				}]
			}, {
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 20
				}]
			}, {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 21
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 17
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 29
				}, {
					"weight": 0.2
				}]
			}, {
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 18
				}]
			}, {
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 16
				}]
			}, {
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 19
				}]
			}, {
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [{
					"color": "#000000"
				}, {
					"lightness": 17
				}]
			}]
		};
		var mapElement = document.getElementById('map');
		var map = new google.maps.Map(mapElement, mapOptions);

		//		точка 1
		var marker = new google.maps.Marker({
			position: {
				//				координаты
				lat: 40.7100,
				lng: -73.9200
			},
			animation: google.maps.Animation.DROP,
			map: map,
			//			иконка
			icon: '../images/ico/map/type-1.png',
			//			тайтл
			title: "Точка 1"
		});
		//		контент инфо окна для "точка 1"
		var infowindow = new google.maps.InfoWindow({
			content: "<ul class='map__info'><li><span><img src='../images/ico/skull.png'></span><a href='#'>Падшие души</a></li><li><span><img src='../images/ico/ufo.png'></span><a href='#'>Пятый элемент</a></li></ul>"
		});
		marker.addListener('click', function () {
			infowindow.open(map, marker);
		});

		//		точка 2
		var marker2 = new google.maps.Marker({
			position: {
				//				координаты
				lat: 40.6400,
				lng: -73.8200
			},
			animation: google.maps.Animation.DROP,
			map: map,
			//			иконка
			icon: '../images/ico/map/type-1.png',
			//			тайтл
			title: "Точка 2"
		});
		//		контент инфо окна для "точка 2"
		var infowindow2 = new google.maps.InfoWindow({
			content: "<ul class='map__info'><li><span><img src='../images/ico/skull.png'></span><a href='#'>Падшие души</a></li></ul>"
		});
		marker2.addListener('click', function () {
			infowindow2.open(map, marker2);
		});

		//		точка 3
		var marker3 = new google.maps.Marker({
			position: {
				//				координаты
				lat: 40.7400,
				lng: -74.200
			},
			animation: google.maps.Animation.DROP,
			map: map,
			//			иконка
			icon: '../images/ico/map/type-1.png',
			//			тайтл
			title: "Точка 3"
		});
		//		контент инфо окна для "точка 3"
		var infowindow3 = new google.maps.InfoWindow({
			content: "<ul class='map__info'><li><span><img src='../images/ico/skull.png'></span><a href='#'>Падшие души</a></li><li><span><img src='../images/ico/skull.png'></span><a href='#'>Еще один квест</a></li><li><span><img src='../images/ico/ufo.png'></span><a href='#'>Еще один квест</a></li><li><span><img src='../images/ico/ufo.png'></span><a href='#'>Еще один квест</a></li></ul>"
		});
		marker3.addListener('click', function () {
			infowindow3.open(map, marker3);
		});

		//		точка n
		//		var marker<<N>> = new google.maps.Marker({
		//			position: {
		////				координаты
		//				lat: 40.6400,
		//				lng: -73.8200
		//			},
		//			animation: google.maps.Animation.DROP,
		//			map: map,
		////			иконка
		//			icon: '../images/ico/map/type-1.png',
		////			тайтл
		//			title: "Точка n"
		//		});
		////		контент инфо окна для "точка 3"
		//		var infowindow<<N>> = new google.maps.InfoWindow({
		//			content: "<ul class='map__info'><li><span><img src='../images/ico/skull.png'></span><a href='#'>Падшие души</a></li></ul>"
		//		});
		//		marker<<N>>.addListener('click', function() {
		//			infowindow<<N>>.open(map, marker<<N>>);
		//		});
	}
	if ($('*').is('.s_main__slider')) {
		$('.s_main__slider').lightSlider({
			item: 1,
			controls: false,
			pager: false,
			auto: true,
			loop: true,
			pause: 5000,
			speed: 1500
		});
	}
});
