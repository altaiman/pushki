'use strict';

(function (root) {

  // svg for all
  svg4everybody();
  scrollTo();

  function scrollTo() {
    var links = document.querySelectorAll('a[href*="#"]');
    links.forEach(function (each) {
      return each.onclick = scrollAnchors;
    });
  }

  function scrollAnchors(e) {
    var respond = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var distanceToTop = function distanceToTop(el) {
      return Math.floor(el.getBoundingClientRect().top);
    };

    e.preventDefault();

    var targetID = respond ? respond.getAttribute('href') : this.getAttribute('href');

    var targetAnchor = document.querySelector(targetID);

    if (!targetAnchor) return;

    var originalTop = distanceToTop(targetAnchor);

    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });

    var checkIfDone = setInterval(function () {
      var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = '-1';
        targetAnchor.focus();
        window.history.pushState('', '', targetID);
        clearInterval(checkIfDone);
      }
    }, 100);

    document.querySelector('.menu').classList.remove('menu_active');
  }

  // Настройки слайдеров data-slider
  var sliderOptions = {
    'slider': {
      cellAlign: 'left',
      wrapAround: true,
      contain: true,
      prevNextButtons: false,
      pageDots: true,
      freeScroll: false,
      autoPlay: true
    }
  };

  document.querySelectorAll('[data-slider]').forEach(function (slider, i) {
    var slides = slider.querySelector('[data-slider-slides]'),
        slidesCount = slides.children.length,
        sliderData = slider.dataset.slider,
        options = sliderOptions[sliderData],
        items = slider.dataset.items,
        // кол-во слайдов при инициализации
    sliderWidth = slider.offsetWidth;

    // Задаём ширину одного слайда
    if (items) {
      Array.from(slides.children).forEach(function (slide, k) {
        slide.style.width = 100 / items + '%';
      });
    }

    var slideWidth = slides.children[0].offsetWidth,
        slidesCapacity = Math.round(sliderWidth / slideWidth),
        controls = slider.querySelector('[data-slider-controls]'),
        controlsEndIndex = slidesCount - slidesCapacity,
        adaptive = Number(slider.dataset.sliderAdaptive),
        windowWidth = window.innerWidth;

    var controlsPrev = void 0,
        controlsNext = void 0;

    if (controls) {
      controlsPrev = controls.querySelector('[data-slider-controls-prev]'), controlsNext = controls.querySelector('[data-slider-controls-next]');
    }

    if (slidesCount > slidesCapacity) {
      slider.classList.add('slider_initial');
      var flkty = new Flickity(slides, options);

      if (controls) {
        controlsPrev.addEventListener('click', function (e) {
          e.preventDefault();
          flkty.previous();
        });

        controlsNext.addEventListener('click', function (e) {
          e.preventDefault();
          flkty.next();
        });

        if (!options.wrapAround) {
          if (flkty.selectedIndex === 0) {
            controlsPrev.disabled = true;
          } else if (flkty.selectedIndex === controlsEndIndex) {
            controlsNext.disabled = true;
          }

          flkty.on('select', function (index) {
            controlsPrev.disabled = index == 0 ? true : false;
            controlsNext.disabled = index == controlsEndIndex ? true : false;
          });

          flkty.on('change', function (index) {
            if (index >= controlsEndIndex) {
              flkty.select(controlsEndIndex);
            }
          });
        }
      }
    }
  });

  // modals

  $('[data-modal]').iziModal({
    focusInput: false
  });

  $('[data-modal-open]').on('click', function (e) {
    e.preventDefault();

    var data = $(this).data('modal-open');
    $('[data-modal="' + data + '"]').iziModal('open');
  });

  $('.header__menu').on('click', function (e) {
    e.preventDefault();

    $('.menu').addClass('menu_active');
  });

  $('.menu__close').on('click', function (e) {
    e.preventDefault();

    $('.menu_active').removeClass('menu_active');
  });

  $('[data-modal-send]').on('click', function (e) {
    e.preventDefault();

    $(this).closest('.modal').find('.modal__content').toggle();
  });

  // mask

  $('[data-masked]').each(function (i, input) {
    var mask = $(input).data('masked');

    switch (mask) {
      case 'phone':
        $(input).mask('+7 (000) 000-00-00');
    }
  });
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwibGlua3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWFjaCIsIm9uY2xpY2siLCJzY3JvbGxBbmNob3JzIiwiZSIsInJlc3BvbmQiLCJkaXN0YW5jZVRvVG9wIiwiTWF0aCIsImZsb29yIiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldElEIiwiZ2V0QXR0cmlidXRlIiwidGFyZ2V0QW5jaG9yIiwicXVlcnlTZWxlY3RvciIsIm9yaWdpbmFsVG9wIiwid2luZG93Iiwic2Nyb2xsQnkiLCJsZWZ0IiwiYmVoYXZpb3IiLCJjaGVja0lmRG9uZSIsInNldEludGVydmFsIiwiYXRCb3R0b20iLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0IiwiYm9keSIsIm9mZnNldEhlaWdodCIsInRhYkluZGV4IiwiZm9jdXMiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInNsaWRlck9wdGlvbnMiLCJjZWxsQWxpZ24iLCJ3cmFwQXJvdW5kIiwiY29udGFpbiIsInByZXZOZXh0QnV0dG9ucyIsInBhZ2VEb3RzIiwiZnJlZVNjcm9sbCIsImF1dG9QbGF5Iiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInNsaWRlc0NvdW50IiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJzbGlkZXJEYXRhIiwiZGF0YXNldCIsIm9wdGlvbnMiLCJpdGVtcyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJBcnJheSIsImZyb20iLCJzbGlkZSIsImsiLCJzdHlsZSIsIndpZHRoIiwic2xpZGVXaWR0aCIsInNsaWRlc0NhcGFjaXR5Iiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiY29udHJvbHNQcmV2IiwiY29udHJvbHNOZXh0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4Iiwic2VsZWN0IiwiJCIsIml6aU1vZGFsIiwiZm9jdXNJbnB1dCIsImRhdGEiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiY2xvc2VzdCIsImZpbmQiLCJ0b2dnbGUiLCJpbnB1dCIsIm1hc2siXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxVQUFTQSxJQUFULEVBQWU7O0FBRWQ7QUFDQUM7QUFDQUM7O0FBRUEsV0FBU0EsUUFBVCxHQUFvQjtBQUNuQixRQUFNQyxRQUFRQyxTQUFTQyxnQkFBVCxDQUEwQixjQUExQixDQUFkO0FBQ0FGLFVBQU1HLE9BQU4sQ0FBYztBQUFBLGFBQVNDLEtBQUtDLE9BQUwsR0FBZUMsYUFBeEI7QUFBQSxLQUFkO0FBQ0E7O0FBRUQsV0FBU0EsYUFBVCxDQUF1QkMsQ0FBdkIsRUFBMEM7QUFBQSxRQUFoQkMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFDekMsUUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLGFBQU1DLEtBQUtDLEtBQUwsQ0FBV0MsR0FBR0MscUJBQUgsR0FBMkJDLEdBQXRDLENBQU47QUFBQSxLQUF0Qjs7QUFFQVAsTUFBRVEsY0FBRjs7QUFFQSxRQUFJQyxXQUFZUixPQUFELEdBQVlBLFFBQVFTLFlBQVIsQ0FBcUIsTUFBckIsQ0FBWixHQUEyQyxLQUFLQSxZQUFMLENBQWtCLE1BQWxCLENBQTFEOztBQUVBLFFBQU1DLGVBQWVqQixTQUFTa0IsYUFBVCxDQUF1QkgsUUFBdkIsQ0FBckI7O0FBRUMsUUFBSSxDQUFDRSxZQUFMLEVBQW1COztBQUVwQixRQUFNRSxjQUFjWCxjQUFjUyxZQUFkLENBQXBCOztBQUVBRyxXQUFPQyxRQUFQLENBQWdCLEVBQUVS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ckM7QUFDRCxHQU5EOztBQVFBRCxJQUFFLGVBQUYsRUFBbUJILEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFVBQVM5RSxDQUFULEVBQVk7QUFDekNBLE1BQUVRLGNBQUY7O0FBRUF5RSxNQUFFLE9BQUYsRUFBV0ksUUFBWCxDQUFvQixhQUFwQjtBQUNELEdBSkQ7O0FBTUFKLElBQUUsY0FBRixFQUFrQkgsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUzlFLENBQVQsRUFBWTtBQUN4Q0EsTUFBRVEsY0FBRjs7QUFFQXlFLE1BQUUsY0FBRixFQUFrQkssV0FBbEIsQ0FBOEIsYUFBOUI7QUFDRCxHQUpEOztBQU1BTCxJQUFFLG1CQUFGLEVBQXVCSCxFQUF2QixDQUEwQixPQUExQixFQUFtQyxVQUFTOUUsQ0FBVCxFQUFZO0FBQzdDQSxNQUFFUSxjQUFGOztBQUVBeUUsTUFBRSxJQUFGLEVBQVFNLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEJDLElBQTFCLENBQStCLGlCQUEvQixFQUFrREMsTUFBbEQ7QUFDRCxHQUpEOztBQU1BOztBQUVBUixJQUFFLGVBQUYsRUFBbUJwRixJQUFuQixDQUF3QixVQUFTNEMsQ0FBVCxFQUFZaUQsS0FBWixFQUFtQjtBQUN6QyxRQUFNQyxPQUFPVixFQUFFUyxLQUFGLEVBQVNOLElBQVQsQ0FBYyxRQUFkLENBQWI7O0FBRUEsWUFBUU8sSUFBUjtBQUNFLFdBQUssT0FBTDtBQUNFVixVQUFFUyxLQUFGLEVBQVNDLElBQVQsQ0FBYyxvQkFBZDtBQUZKO0FBSUQsR0FQRDtBQVNELENBcEtELEVBb0tHN0UsTUFwS0giLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KClcbiAgc2Nyb2xsVG8oKVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvKCkge1xuICBcdGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmKj1cIiNcIl0nKVxuICBcdGxpbmtzLmZvckVhY2goZWFjaCA9PiAoZWFjaC5vbmNsaWNrID0gc2Nyb2xsQW5jaG9ycykpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxBbmNob3JzKGUsIHJlc3BvbmQgPSBudWxsKSB7XG4gIFx0Y29uc3QgZGlzdGFuY2VUb1RvcCA9IGVsID0+IE1hdGguZmxvb3IoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKVxuXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgXHRsZXQgdGFyZ2V0SUQgPSAocmVzcG9uZCkgPyByZXNwb25kLmdldEF0dHJpYnV0ZSgnaHJlZicpIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuXG4gIFx0Y29uc3QgdGFyZ2V0QW5jaG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJRClcblxuICAgIGlmICghdGFyZ2V0QW5jaG9yKSByZXR1cm5cblxuICBcdGNvbnN0IG9yaWdpbmFsVG9wID0gZGlzdGFuY2VUb1RvcCh0YXJnZXRBbmNob3IpXG5cbiAgXHR3aW5kb3cuc2Nyb2xsQnkoeyB0b3A6IG9yaWdpbmFsVG9wLCBsZWZ0OiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSlcblxuICBcdGNvbnN0IGNoZWNrSWZEb25lID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gIFx0XHRjb25zdCBhdEJvdHRvbSA9IHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5wYWdlWU9mZnNldCA+PSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDJcbiAgXHRcdGlmIChkaXN0YW5jZVRvVG9wKHRhcmdldEFuY2hvcikgPT09IDAgfHwgYXRCb3R0b20pIHtcbiAgXHRcdFx0dGFyZ2V0QW5jaG9yLnRhYkluZGV4ID0gJy0xJ1xuICBcdFx0XHR0YXJnZXRBbmNob3IuZm9jdXMoKVxuICBcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCB0YXJnZXRJRClcbiAgXHRcdFx0Y2xlYXJJbnRlcnZhbChjaGVja0lmRG9uZSlcbiAgXHRcdH1cbiAgXHR9LCAxMDApXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfYWN0aXZlJylcbiAgfVxuXG4gIC8vINCd0LDRgdGC0YDQvtC50LrQuCDRgdC70LDQudC00LXRgNC+0LIgZGF0YS1zbGlkZXJcbiAgY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcbiAgICAnc2xpZGVyJzoge1xuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBwYWdlRG90czogdHJ1ZSxcbiAgICAgIGZyZWVTY3JvbGw6IGZhbHNlLFxuICAgICAgYXV0b1BsYXk6IHRydWVcbiAgICB9XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbGlkZXJdJykuZm9yRWFjaCgoc2xpZGVyLCBpKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1zbGlkZXNdJyksXG4gICAgICAgICAgc2xpZGVzQ291bnQgPSBzbGlkZXMuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICAgIHNsaWRlckRhdGEgPSBzbGlkZXIuZGF0YXNldC5zbGlkZXIsXG4gICAgICAgICAgb3B0aW9ucyA9IHNsaWRlck9wdGlvbnNbc2xpZGVyRGF0YV0sXG4gICAgICAgICAgaXRlbXMgPSBzbGlkZXIuZGF0YXNldC5pdGVtcywgLy8g0LrQvtC7LdCy0L4g0YHQu9Cw0LnQtNC+0LIg0L/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG4gICAgICAgICAgc2xpZGVyV2lkdGggPSBzbGlkZXIub2Zmc2V0V2lkdGhcblxuICAgIC8vINCX0LDQtNCw0ZHQvCDRiNC40YDQuNC90YMg0L7QtNC90L7Qs9C+INGB0LvQsNC50LTQsFxuICAgIGlmIChpdGVtcykge1xuICAgICAgQXJyYXkuZnJvbShzbGlkZXMuY2hpbGRyZW4pLmZvckVhY2goKHNsaWRlLCBrKSA9PiB7XG4gICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gYCR7MTAwIC8gaXRlbXN9JWBcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3Qgc2xpZGVXaWR0aCA9IHNsaWRlcy5jaGlsZHJlblswXS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZXNDYXBhY2l0eSA9IE1hdGgucm91bmQoc2xpZGVyV2lkdGgvc2xpZGVXaWR0aCksXG4gICAgICAgICAgY29udHJvbHMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzXScpLFxuICAgICAgICAgIGNvbnRyb2xzRW5kSW5kZXggPSBzbGlkZXNDb3VudCAtIHNsaWRlc0NhcGFjaXR5LFxuICAgICAgICAgIGFkYXB0aXZlID0gTnVtYmVyKHNsaWRlci5kYXRhc2V0LnNsaWRlckFkYXB0aXZlKSxcbiAgICAgICAgICB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cbiAgICBsZXQgY29udHJvbHNQcmV2LCBjb250cm9sc05leHRcblxuICAgIGlmIChjb250cm9scykge1xuICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICBjb250cm9sc05leHQgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtbmV4dF0nKVxuICAgIH1cblxuXG4gICAgaWYgKHNsaWRlc0NvdW50ID4gc2xpZGVzQ2FwYWNpdHkpIHtcbiAgICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaW5pdGlhbCcpXG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHNQcmV2XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkucHJldmlvdXMoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgICAgfSlcblxuICAgICAgICBpZiAoIW9wdGlvbnMud3JhcEFyb3VuZCkge1xuICAgICAgICAgIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBjb250cm9sc1ByZXYuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSBjb250cm9sc0VuZEluZGV4KSB7XG4gICAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmxrdHkub24oJ3NlbGVjdCcsIChpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29udHJvbHNQcmV2LmRpc2FibGVkID0gKGluZGV4ID09IDApID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSAoaW5kZXggPT0gY29udHJvbHNFbmRJbmRleCkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgZmxrdHkub24oJ2NoYW5nZScsIChpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgZmxrdHkuc2VsZWN0KGNvbnRyb2xzRW5kSW5kZXgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvLyBtb2RhbHNcblxuICAkKCdbZGF0YS1tb2RhbF0nKS5pemlNb2RhbCh7XG4gICAgZm9jdXNJbnB1dDogZmFsc2VcbiAgfSlcblxuICAkKCdbZGF0YS1tb2RhbC1vcGVuXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuXG4gICAgY29uc3QgZGF0YSA9ICQodGhpcykuZGF0YSgnbW9kYWwtb3BlbicpXG4gICAgJChgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYCkuaXppTW9kYWwoJ29wZW4nKVxuICB9KVxuXG4gICQoJy5oZWFkZXJfX21lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAkKCcubWVudScpLmFkZENsYXNzKCdtZW51X2FjdGl2ZScpXG4gIH0pXG5cbiAgJCgnLm1lbnVfX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJCgnLm1lbnVfYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ21lbnVfYWN0aXZlJylcbiAgfSlcblxuICAkKCdbZGF0YS1tb2RhbC1zZW5kXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICQodGhpcykuY2xvc2VzdCgnLm1vZGFsJykuZmluZCgnLm1vZGFsX19jb250ZW50JykudG9nZ2xlKClcbiAgfSlcblxuICAvLyBtYXNrXG5cbiAgJCgnW2RhdGEtbWFza2VkXScpLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgICBjb25zdCBtYXNrID0gJChpbnB1dCkuZGF0YSgnbWFza2VkJylcblxuICAgIHN3aXRjaCAobWFzaykge1xuICAgICAgY2FzZSAncGhvbmUnOlxuICAgICAgICAkKGlucHV0KS5tYXNrKCcrNyAoMDAwKSAwMDAtMDAtMDAnKVxuICAgIH1cbiAgfSlcblxufSkod2luZG93KTtcbiJdfQ==