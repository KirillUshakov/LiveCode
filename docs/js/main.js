AOS.init({
  duration: 800,
  easing: "slide",
  once: true,
});

jQuery(document).ready(function ($) {
  "use strict";

  var siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter,
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter,
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      var $this = $(this);
      if ($this.closest("li").find(".collapse").hasClass("show")) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function () {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function (e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();

  var sitePlusMinus = function () {
    $(".js-btn-minus").on("click", function (e) {
      e.preventDefault();
      if ($(this).closest(".input-group").find(".form-control").val() != 0) {
        $(this)
          .closest(".input-group")
          .find(".form-control")
          .val(
            parseInt(
              $(this).closest(".input-group").find(".form-control").val()
            ) - 1
          );
      } else {
        $(this).closest(".input-group").find(".form-control").val(parseInt(0));
      }
    });
    $(".js-btn-plus").on("click", function (e) {
      e.preventDefault();
      $(this)
        .closest(".input-group")
        .find(".form-control")
        .val(
          parseInt(
            $(this).closest(".input-group").find(".form-control").val()
          ) + 1
        );
    });
  };
  // sitePlusMinus();

  var siteSliderRange = function () {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 500,
      values: [75, 300],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - $" +
        $("#slider-range").slider("values", 1)
    );
  };
  // siteSliderRange();

  var siteMagnificPopup = function () {
    $(".image-popup").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        verticalFit: true,
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
      },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false,
    });
  };
  siteMagnificPopup();

  var siteCarousel = function () {
    if ($(".nonloop-block-13").length > 0) {
      $(".nonloop-block-13").owlCarousel({
        center: false,
        items: 1,
        loop: false,
        stagePadding: 0,
        margin: 20,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">',
        ],
        responsive: {
          600: {
            margin: 20,
            items: 2,
          },
          1000: {
            margin: 20,
            stagePadding: 0,
            items: 2,
          },
          1200: {
            margin: 20,
            stagePadding: 0,
            items: 3,
          },
        },
      });
    }

    $(".slide-one-item").owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      pauseOnHover: false,
      nav: true,
      navText: [
        '<span class="icon-arrow_back">',
        '<span class="icon-arrow_forward">',
      ],
    });
  };
  siteCarousel();

  var siteStellar = function () {
    $(window).stellar({
      responsive: false,
      parallaxBackgrounds: true,
      parallaxElements: true,
      horizontalScrolling: false,
      hideDistantElements: false,
      scrollProperty: "scroll",
    });
  };
  siteStellar();

  var siteCountDown = function () {
    $("#date-countdown").countdown("2020/10/10", function (event) {
      var $this = $(this).html(
        event.strftime(
          "" +
            '<span class="countdown-block"><span class="label">%w</span> weeks </span>' +
            '<span class="countdown-block"><span class="label">%d</span> days </span>' +
            '<span class="countdown-block"><span class="label">%H</span> hr </span>' +
            '<span class="countdown-block"><span class="label">%M</span> min </span>' +
            '<span class="countdown-block"><span class="label">%S</span> sec</span>'
        )
      );
    });
  };
  siteCountDown();

  // Live video logic
  /////////////////////////////////////////////////////////

  // -- Variables
  /////////////////////////////

  const player = document.getElementById("player");
  const videoContainer = document.querySelector("#live-video");
  const video = videoContainer.querySelector("video") || videoContainer;

  const liveTime = document.getElementById('live-time')
  const playBtn = document.getElementById('player-video-play-btn')
  const volume = document.getElementById("player-volume");
  const soundBtn = document.getElementById("player-sound-btn");
  const fsBtn = document.getElementById("player-fullscreen-btn");

  // -- Events
  /////////////////////////////

  // ---- Live time
  setInterval(() => {
    setLiveTime()
  }, 1000)

  // ---- Play video
  playBtn.addEventListener('click', function(e) {
    e.preventDefault()

    playVideo(video)
    player.classList.add('play')
  })

  // ---- Open fullscreen video by dbclick
  video.addEventListener("dblclick", function (e) {
    e.preventDefault();

    toggleFullScreen(player);
    toggleFullScreenBtn(fsBtn, video, soundBtn);
  });

  // ---- Switch Sound (on/off) button
  soundBtn.addEventListener("click", function (e) {
    e.preventDefault();

    toggleSoundMixer(video, this);
  });

  // ---- Sound mixer
  volume.addEventListener("input", function () {
    setVideoVolume(video, this.value)
  });

  // ---- FullScreen Button
  fsBtn.addEventListener("click", function (e) {
    e.preventDefault();

    toggleFullScreen(player);
    toggleFullScreenBtn(fsBtn, video, soundBtn);
  });

  // -- Fucntions
  /////////////////////////////
  function setLiveTime() {
    let result = "Today at "
    const now = new Date();
    const time = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
    let timeZoneUTC = now.getUTCDate() > 0 ? '+' + now.getUTCDate() : '-' + now.getUTCDate();

    liveTime.innerHTML = result + time + ` (GMT${timeZoneUTC})`
  }
  setLiveTime()

  function playVideo(video) {
    video.play()
  }

  function toggleFullScreen(elem) {
    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        elem.classList.add('fullScreenMode')
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
        elem.classList.add('fullScreenMode')
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        elem.classList.add('fullScreenMode')
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
        elem.classList.add('fullScreenMode')
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      elem.classList.remove('fullScreenMode')
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      elem.classList.remove('fullScreenMode')
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      elem.classList.remove('fullScreenMode')
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      elem.classList.remove('fullScreenMode')
    }
  }

  function toggleFullScreenBtn(button, video, soundBtn) {
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      if (video.muted === true || video.muted === "muted") {
        toggleSoundMixer(video, soundBtn);
      }
    }
  }

  function toggleSoundMixer(video, elem) {
    if (video.muted === "muted" || video.muted === true) {
      video.muted = false;
      elem.classList.remove("muted");
    } else {
      video.muted = true;
      elem.classList.add("muted");
    }
  }

  function setVideoVolume(video, val) {
    video.volume = val / 100;
  }
  setVideoVolume(video, volume.value)
});
