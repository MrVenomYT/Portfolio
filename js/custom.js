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
				if (typeof renderD3ProjectStats === "function" && d3StatsAnimated) {
					renderD3ProjectStats();
				}
			}
		}
	}

	/* ----------------------------------------------------------- */
	/*  D3 DYNAMIC PROJECT STATISTICS BREAKDOWN
	/* ----------------------------------------------------------- */
	var d3StatsAnimated = false;

	var projectStatsData = [
		{ name: 'Full-Stack MERN', count: 42, color: '#72b626', icon: 'fa-cubes' },
		{ name: 'Discord Bots & Automation', count: 28, color: '#5865F2', icon: 'fa-discord' },
		{ name: 'Frontend SPAs & Dashboards', count: 18, color: '#61DAFB', icon: 'fa-react' },
		{ name: 'APIs & Backend Services', count: 9, color: '#F7DF1E', icon: 'fa-server' }
	];

	function renderD3ProjectStats() {
		if (typeof d3 === 'undefined') return;

		var container = d3.select('#d3DonutContainer');
		if (container.empty()) return;

		// Clear previous svg
		container.select('svg').remove();

		var width = 280;
		var height = 280;
		var radius = Math.min(width, height) / 2 - 12;
		var innerRadius = radius - 40;

		// Sync active skin color
		var activeThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--skin-color').trim() || '#72b626';
		projectStatsData[0].color = activeThemeColor;

		var svg = container.append('svg')
			.attr('class', 'd3-donut-svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

		var tooltip = d3.select('body').select('.d3-chart-tooltip');
		if (tooltip.empty()) {
			tooltip = d3.select('body').append('div').attr('class', 'd3-chart-tooltip');
		}

		var pie = d3.pie()
			.value(function(d) { return d.count; })
			.sort(null)
			.padAngle(0.04);

		var arc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(radius)
			.cornerRadius(6);

		var arcHover = d3.arc()
			.innerRadius(innerRadius - 4)
			.outerRadius(radius + 10)
			.cornerRadius(8);

		var bgArc = d3.arc()
			.innerRadius(innerRadius)
			.outerRadius(radius);

		svg.append('path')
			.datum({ startAngle: 0, endAngle: 2 * Math.PI })
			.style('fill', '#222')
			.attr('d', bgArc);

		var g = svg.selectAll('.d3-arc')
			.data(pie(projectStatsData))
			.enter().append('g')
			.attr('class', 'd3-arc');

		var paths = g.append('path')
			.attr('fill', function(d) { return d.data.color; })
			.attr('stroke', '#191919')
			.attr('stroke-width', '2px')
			.style('cursor', 'pointer')
			.style('transition', 'filter 0.3s ease');

		// Smooth Entry Arc Loading Animation
		paths.transition()
			.duration(1300)
			.ease(d3.easeCubicOut)
			.attrTween('d', function(d) {
				var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
				return function(t) {
					return arc(interpolate(t));
				};
			});

		// Slice Hover & Interactivity
		paths.on('mouseenter', function(event, d) {
			d3.select(this)
				.transition().duration(200)
				.attr('d', arcHover)
				.style('filter', 'drop-shadow(0 0 14px ' + d.data.color + ')');

			tooltip.style('opacity', '1')
				.html('<strong>' + d.data.name + '</strong><br>' + d.data.count + ' Projects (' + Math.round((d.data.count / 97) * 100) + '%)')
				.style('left', (event.pageX + 15) + 'px')
				.style('top', (event.pageY - 28) + 'px')
				.style('border-color', d.data.color);

			$('#d3TotalCount').text(d.data.count).css('color', d.data.color);
		})
		.on('mousemove', function(event) {
			tooltip.style('left', (event.pageX + 15) + 'px')
				.style('top', (event.pageY - 28) + 'px');
		})
		.on('mouseleave', function(event, d) {
			d3.select(this)
				.transition().duration(200)
				.attr('d', arc)
				.style('filter', 'none');

			tooltip.style('opacity', '0');
			$('#d3TotalCount').text('97').css('color', '#fff');
		});

		// Build Legends List
		var legendContainer = $('#d3LegendList').empty();
		projectStatsData.forEach(function(item, idx) {
			var pct = Math.round((item.count / 97) * 100);
			var legendHtml = $(
				'<div class="d3-legend-item" data-index="' + idx + '">' +
					'<div class="d3-legend-left">' +
						'<div class="d3-legend-color" style="background-color: ' + item.color + '"></div>' +
						'<span class="d3-legend-name">' + item.name + '</span>' +
					'</div>' +
					'<span class="d3-legend-val">' + item.count + ' (' + pct + '%)</span>' +
				'</div>'
			);

			legendHtml.on('mouseenter', function() {
				paths.filter(function(d, i) { return i === idx; })
					.transition().duration(200)
					.attr('d', arcHover)
					.style('filter', 'drop-shadow(0 0 14px ' + item.color + ')');
				$('#d3TotalCount').text(item.count).css('color', item.color);
			}).on('mouseleave', function() {
				paths.filter(function(d, i) { return i === idx; })
					.transition().duration(200)
					.attr('d', arc)
					.style('filter', 'none');
				$('#d3TotalCount').text('97').css('color', '#fff');
			});

			legendContainer.append(legendHtml);
		});

		// Animate Horizontal Distribution Bars
		$('.d3-bar-fill').each(function() {
			var targetW = $(this).attr('data-d3-width');
			$(this).css('width', targetW);
		});

		// Animate Metric Counters
		$('.d3-count').each(function() {
			var $this = $(this);
			var targetVal = parseInt($this.attr('data-val'), 10) || 0;
			$({ countNum: 0 }).animate({ countNum: targetVal }, {
				duration: 1400,
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
		/*  ON-CLICK: SMOOTH SCROLL HANDLERS
		/* ----------------------------------------------------------- */
		$('.scrollToStats, .scrollToSkills').on('click', function(e) {
			var href = $(this).attr('href');
			if (href && href.startsWith('#')) {
				var target = $(href);
				if (target.length) {
					e.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top - 20
					}, 800);
				}
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
		/*  ON-CLICK: FAQ ACCORDION EXPAND/COLLAPSE
		/* ----------------------------------------------------------- */
		$('.faq-accordion-header').on('click', function() {
			var $item = $(this).closest('.faq-accordion-item');
			var isActive = $item.hasClass('active');

			// Close all other items
			$('.faq-accordion-item').removeClass('active');

			// If it wasn't already active, open it
			if (!isActive) {
				$item.addClass('active');
			}
		});

		/* ----------------------------------------------------------- */
		/*  ON-SCROLL: TRIGGER D3 CHARTS, PROGRESS BARS & NUMERIC COUNTERS
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
			// Observer for D3 Stats Section
			var statsSection = document.getElementById('project-stats');
			if (statsSection) {
				var statsObserver = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting && !d3StatsAnimated) {
							d3StatsAnimated = true;
							renderD3ProjectStats();
						}
					});
				}, { threshold: 0.1 });

				statsObserver.observe(statsSection);
			}

			// Observer for Skills Section
			var skillsSection = document.getElementById('skills-section');
			if (skillsSection) {
				var skillsObserver = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting && !skillsAnimated) {
							skillsAnimated = true;
							animateProgressBars();
							animateStatsCounters();
						}
					});
				}, { threshold: 0.15 });

				skillsObserver.observe(skillsSection);
			}
		} else {
			// Fallback on scroll
			$(window).on('scroll', function() {
				var statsSec = $('#project-stats');
				if (statsSec.length && !d3StatsAnimated) {
					var top1 = statsSec.offset().top;
					var b1 = $(window).scrollTop() + $(window).innerHeight();
					if (b1 > top1 + 50) {
						d3StatsAnimated = true;
						renderD3ProjectStats();
					}
				}

				var skillsSec = $('#skills-section');
				if (skillsSec.length && !skillsAnimated) {
					var top2 = skillsSec.offset().top;
					var b2 = $(window).scrollTop() + $(window).innerHeight();
					if (b2 > top2 + 100) {
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
			$('.tech-badge-card, .skill-progress-card, .testimonial-card, .d3-chart-card').on('mousemove', function(e) {
				var $card = $(this);
				var rect = this.getBoundingClientRect();
				var x = e.clientX - rect.left;
				var y = e.clientY - rect.top;

				var centerX = rect.width / 2;
				var centerY = rect.height / 2;

				var rotateX = ((y - centerY) / centerY) * -5;
				var rotateY = ((x - centerX) / centerX) * 5;

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
