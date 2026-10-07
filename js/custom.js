(function($) {
	"use strict";

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
	/* ----------------------------------------------------------- */
	function stop_videos() {
		var video = document.getElementById("video");
		if (video && video.paused !== true && video.ended !== true) {
			video.pause();
		}
		if ($('.youtube-video').length && $('.youtube-video')[0].contentWindow) {
			$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
		}
	}

	/* ----------------------------------------------------------- */
	/*  SKIN COLOR MAP FOR DYNAMIC CSS VARIABLE SYNC
	/* ----------------------------------------------------------- */
	var skinColors = {
		'green': '#72b626',
		'blue': '#2575fc',
		'yellow': '#ffb400',
		'blueviolet': '#6957af',
		'goldenrod': '#e5a00d',
		'magenta': '#ee2761',
		'orange': '#fa5b0f',
		'purple': '#9b59b6',
		'red': '#ff3838',
		'yellowgreen': '#9acd32'
	};

	function syncSkinColorVariable() {
		if (typeof getActiveStyleSheet === "function") {
			var activeSkin = getActiveStyleSheet();
			if (activeSkin && skinColors[activeSkin]) {
				document.documentElement.style.setProperty('--skin-color', skinColors[activeSkin]);
			}
		}
	}

	$(document).ready(function() {

		syncSkinColorVariable();

		// Update on switcher item click
		$('.content-switcher ul li a').on('click', function() {
			setTimeout(syncSkinColorVariable, 100);
		});

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
		/* ----------------------------------------------------------- */
		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
		/* ----------------------------------------------------------- */
		$(".revealator-delay1").addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
		/* ----------------------------------------------------------- */
		if ($('.grid').length && typeof CBPGridGallery !== "undefined") {
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		}

		/* ----------------------------------------------------------- */
		/*  BUTTONS ANIMATION
		/* ----------------------------------------------------------- */
		function checkSize() {
			if ($( document ).width() > 992) {
				var btn_hover = "";
				$(".btn-about").each(function() {
					if (!$(this).find('span[data-hover]').length) {
						var btn_text = $(this).text().trim();
						$(this).addClass(btn_hover).empty().append("<span data-hover='" + btn_text + "'>" + btn_text + "</span>");
					}
				});
			}
		}
		checkSize();
		window.addEventListener('resize', function () {
			checkSize();
		});

		/* ----------------------------------------------------------- */
		/*  HIDE/SHOW HEADER WHEN PORTFOLIO SLIDESHOW OPENED/CLOSED
		/* ----------------------------------------------------------- */
		$(".grid figure").on('click', function() {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		$(".nav-close").on('click', function() {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
		/* ----------------------------------------------------------- */
		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			if (typeof $(item[i]).hoverdir === "function") {
				$(item[i]).hoverdir();
			}
		}

		/* ----------------------------------------------------------- */
		/*  ON-CLICK: SMOOTH SCROLL TO SKILLS
		/* ----------------------------------------------------------- */
		$('.scrollToSkills').on('click', function(e) {
			e.preventDefault();
			var target = $('#skills-section');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - 30
				}, 800);
			}
		});

		/* ----------------------------------------------------------- */
		/*  ON-CLICK: RIPPLE WAVE EFFECT
		/* ----------------------------------------------------------- */
		$(document).on('click', '.btn, .btn-secondary-custom, .filter-btn, .social-btn, .icon-box', function(e) {
			var $this = $(this);
			var offset = $this.offset();
			var x = e.pageX - offset.left;
			var y = e.pageY - offset.top;

			var $ripple = $('<span class="ripple-wave"></span>');
			$ripple.css({
				left: x + 'px',
				top: y + 'px',
				width: '30px',
				height: '30px'
			});

			$this.append($ripple);
			setTimeout(function() {
				$ripple.remove();
			}, 600);
		});

		/* ----------------------------------------------------------- */
		/*  ON-CLICK: INTERACTIVE SKILL CATEGORY FILTER
		/* ----------------------------------------------------------- */
		$('.skills-filters .filter-btn').on('click', function() {
			var $btn = $(this);
			var filterValue = $btn.attr('data-filter');

			$('.skills-filters .filter-btn').removeClass('active');
			$btn.addClass('active');

			var $items = $('.skill-item');
			$items.css({
				'opacity': '0',
				'transform': 'scale(0.92)'
			});

			setTimeout(function() {
				if (filterValue === 'all') {
					$items.show().css({
						'opacity': '1',
						'transform': 'scale(1)'
					});
				} else {
					$items.each(function() {
						var itemCategory = $(this).attr('data-category') || '';
						if (itemCategory.indexOf(filterValue) !== -1) {
							$(this).show().css({
								'opacity': '1',
								'transform': 'scale(1)'
							});
						} else {
							$(this).hide();
						}
					});
				}
			}, 250);
		});

		/* ----------------------------------------------------------- */
		/*  ON-CLICK: INTERACTIVE PORTFOLIO PROJECT CATEGORY FILTER
		/* ----------------------------------------------------------- */
		$('.portfolio-filters .filter-btn').on('click', function() {
			var $btn = $(this);
			var filterValue = $btn.attr('data-project-filter');

			$('.portfolio-filters .filter-btn').removeClass('active');
			$btn.addClass('active');

			var $projectItems = $('.project-grid-item');
			$projectItems.css({
				'opacity': '0',
				'transform': 'scale(0.90)'
			});

			setTimeout(function() {
				if (filterValue === 'all') {
					$projectItems.show().css({
						'opacity': '1',
						'transform': 'scale(1)'
					});
				} else {
					$projectItems.each(function() {
						var itemCategory = $(this).attr('data-category') || '';
						if (itemCategory === filterValue) {
							$(this).show().css({
								'opacity': '1',
								'transform': 'scale(1)'
							});
						} else {
							$(this).hide();
						}
					});
				}
			}, 250);
		});

		/* ----------------------------------------------------------- */
		/*  ON-SCROLL: TRIGGER PROGRESS BARS & NUMERIC COUNTERS
		/* ----------------------------------------------------------- */
		var skillsAnimated = false;

		function animateProgressBars() {
			$('.skill-progress-card').each(function() {
				var $fill = $(this).find('.skill-fill');
				var targetWidth = $fill.attr('data-width');
				$fill.css('width', targetWidth);

				var $percentage = $(this).find('.skill-percentage');
				var targetVal = parseInt($percentage.attr('data-target'), 10) || 0;
				$({ countNum: 0 }).animate({ countNum: targetVal }, {
					duration: 1200,
					easing: 'swing',
					step: function() {
						$percentage.text(Math.floor(this.countNum) + '%');
					},
					complete: function() {
						$percentage.text(this.countNum + '%');
					}
				});
			});
		}

		function animateStatsCounters() {
			$('.counter').each(function() {
				var $this = $(this);
				var targetCount = parseInt($this.attr('data-count'), 10);
				$({ countNum: 0 }).animate({ countNum: targetCount }, {
					duration: 1500,
					easing: 'swing',
					step: function() {
						$this.text(Math.floor(this.countNum));
					},
					complete: function() {
						$this.text(this.countNum);
					}
				});
			});
		}

		if ('IntersectionObserver' in window) {
			var skillsSection = document.getElementById('skills-section');
			if (skillsSection) {
				var observer = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting && !skillsAnimated) {
							skillsAnimated = true;
							animateProgressBars();
							animateStatsCounters();
						}
					});
				}, { threshold: 0.15 });

				observer.observe(skillsSection);
			}
		} else {
			// Fallback on scroll
			$(window).on('scroll', function() {
				var skillsSec = $('#skills-section');
				if (skillsSec.length && !skillsAnimated) {
					var top_of_element = skillsSec.offset().top;
					var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
					if (bottom_of_screen > top_of_element + 100) {
						skillsAnimated = true;
						animateProgressBars();
						animateStatsCounters();
					}
				}
			});
		}

		/* ----------------------------------------------------------- */
		/*  ON-HOVER: 3D TILT EFFECT ON CARDS
		/* ----------------------------------------------------------- */
		if ($(window).width() > 768) {
			$('.tech-badge-card, .skill-progress-card').on('mousemove', function(e) {
				var $card = $(this);
				var rect = this.getBoundingClientRect();
				var x = e.clientX - rect.left;
				var y = e.clientY - rect.top;

				var centerX = rect.width / 2;
				var centerY = rect.height / 2;

				var rotateX = ((y - centerY) / centerY) * -6;
				var rotateY = ((x - centerX) / centerX) * 6;

				$card.css({
					'transform': 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)',
					'transition': 'transform 0.1s ease'
				});
			}).on('mouseleave', function() {
				$(this).css({
					'transform': '',
					'transition': 'all 0.35s ease'
				});
			});
		}

	});

	$(document).keyup(function(e) {
		/* ----------------------------------------------------------- */
		/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
		/* ----------------------------------------------------------- */
		if (e.keyCode === 27) {
			stop_videos();
			$('.close-content').click();
			$("#navbar-collapse-toggle").removeClass('hide-header');
		}
		if ((e.keyCode === 37) || (e.keyCode === 39)) {
			stop_videos();
		}
	});

})(jQuery);
