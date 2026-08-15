(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

    // Helper: preserve layout when navbar becomes fixed during scroll
    function updateNavbarTop() {
        var $nav = $('.navbar');
        var navH = $nav.outerHeight();
        if ($nav.hasClass('scrolled') || $nav.hasClass('menu-open') || $nav.hasClass('fixed-top')) {
            $('body').css('padding-top', navH + 'px');
        } else {
            $('body').css('padding-top', '');
        }
    }

    // Update navbar state on load and resize
    $(window).on('load resize', function () {
        updateNavbarTop();
    });


    // Sticky Navbar and logo switch on scroll
    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var $nav = $('.navbar');
        var $logoDarkNow = $('#logo-dark');
        var $logoLightNow = $('#logo-light');

        if (scrollTop > 0) {
            $nav.addClass('shadow-sm scrolled fixed-top');
            if ($logoDarkNow.length && $logoLightNow.length) {
                $logoDarkNow.hide();
                $logoLightNow.show().attr({ width: 140, height: 44 });
            }
        } else {
            $nav.removeClass('shadow-sm scrolled fixed-top');
            if ($logoDarkNow.length && $logoLightNow.length) {
                $logoLightNow.hide();
                $logoDarkNow.show().attr({ width: 160, height: 50 });
            }
        }

        // Ensure navbar top position respects fixed layout spacing
        updateNavbarTop();
    });

    // Run once to initialize navbar state based on initial scroll position
    $(window).trigger('scroll');
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
    // Toggle logo between dark and light when navbar (hamburger) is opened/closed
    var $navCollapse = $('#navbarCollapse');
    var $logoDark = $('#logo-dark');
    var $logoLight = $('#logo-light');

    // Ensure initial state: dark logo visible
    if ($logoDark.length && $logoLight.length) {
        $logoDark.show();
        $logoLight.hide();

        // When collapse/show (menu opens) -> show light logo and fix navbar
        $navCollapse.on('show.bs.collapse', function () {
            var $nav = $('.navbar');
            $logoDark.hide();
            $logoLight.show().attr({ width: 140, height: 44 });
            $nav.addClass('menu-open');
            // add body padding to avoid content jump when navbar becomes fixed
            var navH = $nav.outerHeight();
            if (navH) $('body').css('padding-top', navH + 'px');
            // when menu opens, navbar should be fixed at top
            $nav.css('top', '0');
        });

        // When collapse/hide (menu closes) -> show dark logo and restore navbar
        $navCollapse.on('hide.bs.collapse', function () {
            var $nav = $('.navbar');
            $logoLight.hide();
            $logoDark.show().attr({ width: 160, height: 50 });
            $nav.removeClass('menu-open');
            $('body').css('padding-top', '');
            // restore navbar top based on topbar visibility
            updateNavbarTop();
        });
    }
    
})(jQuery);

