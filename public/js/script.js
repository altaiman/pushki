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

  // datepicker

  var disabledDays = [0, 6];

  $('#calendar').datepicker({
    navTitles: {
      days: 'MM',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2'
    }
  });

  $('.navigator__item a').on('click', function (e) {
    e.preventDefault();

    var room = $(this).attr('href');

    $('[data-room="' + room + '"]').addClass('section__room_active');
  });

  $('.back').on('click', function (e) {
    e.preventDefault();

    $('.section__room_active').removeClass('section__room_active');
  });

  $('.range__input input').on("input", function () {
    $('.range__value').text(this.value);
  }).trigger("change");

  $('.range__button').on('click', function (e) {
    e.preventDefault();

    var range = $(this).closest('.range'),
        input = $(range).find('input'),
        value = Number($(input).val()),
        maxValue = Number($(input).attr('max')),
        minValue = Number($(input).attr('min'));

    if ($(this).hasClass('range__button_minus')) {
      if (value === minValue) return;
      $(input).val(--value);
    } else {
      if (value === maxValue) return;
      $(input).val(++value);
    }

    $(range).find('.range__value').text(value);
  });

  // modals

  // $('[data-modal]').iziModal({
  //   focusInput: false
  // })
  //
  // $('[data-modal-open]').on('click', function(e) {
  //   e.preventDefault()
  //
  //
  //   const data = $(this).data('modal-open')
  //   $(`[data-modal="${data}"]`).iziModal('open')
  // })
  //
  // $('.header__menu').on('click', function(e) {
  //   e.preventDefault()
  //
  //   $('.menu').addClass('menu_active')
  // })
  //
  // $('.menu__close').on('click', function(e) {
  //   e.preventDefault()
  //
  //   $('.menu_active').removeClass('menu_active')
  // })
  //
  // $('[data-modal-send]').on('click', function(e) {
  //   e.preventDefault()
  //
  //   $(this).closest('.modal').find('.modal__content').toggle()
  // })

  // mask
  //
  // $('[data-masked]').each(function(i, input) {
  //   const mask = $(input).data('masked')
  //
  //   switch (mask) {
  //     case 'phone':
  //       $(input).mask('+7 (000) 000-00-00')
  //   }
  // })

  $('input[type="tel"]').mask('+7 (000) 000-00-00');
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwibGlua3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWFjaCIsIm9uY2xpY2siLCJzY3JvbGxBbmNob3JzIiwiZSIsInJlc3BvbmQiLCJkaXN0YW5jZVRvVG9wIiwiTWF0aCIsImZsb29yIiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldElEIiwiZ2V0QXR0cmlidXRlIiwidGFyZ2V0QW5jaG9yIiwicXVlcnlTZWxlY3RvciIsIm9yaWdpbmFsVG9wIiwid2luZG93Iiwic2Nyb2xsQnkiLCJsZWZ0IiwiYmVoYXZpb3IiLCJjaGVja0lmRG9uZSIsInNldEludGVydmFsIiwiYXRCb3R0b20iLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0IiwiYm9keSIsIm9mZnNldEhlaWdodCIsInRhYkluZGV4IiwiZm9jdXMiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInNsaWRlck9wdGlvbnMiLCJjZWxsQWxpZ24iLCJ3cmFwQXJvdW5kIiwiY29udGFpbiIsInByZXZOZXh0QnV0dG9ucyIsInBhZ2VEb3RzIiwiZnJlZVNjcm9sbCIsImF1dG9QbGF5Iiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInNsaWRlc0NvdW50IiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJzbGlkZXJEYXRhIiwiZGF0YXNldCIsIm9wdGlvbnMiLCJpdGVtcyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJBcnJheSIsImZyb20iLCJzbGlkZSIsImsiLCJzdHlsZSIsIndpZHRoIiwic2xpZGVXaWR0aCIsInNsaWRlc0NhcGFjaXR5Iiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiY29udHJvbHNQcmV2IiwiY29udHJvbHNOZXh0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4Iiwic2VsZWN0IiwiZGlzYWJsZWREYXlzIiwiJCIsImRhdGVwaWNrZXIiLCJuYXZUaXRsZXMiLCJkYXlzIiwibW9udGhzIiwieWVhcnMiLCJyb29tIiwiYXR0ciIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0ZXh0IiwidmFsdWUiLCJ0cmlnZ2VyIiwicmFuZ2UiLCJjbG9zZXN0IiwiaW5wdXQiLCJmaW5kIiwidmFsIiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsImhhc0NsYXNzIiwibWFzayJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFVBQVNBLElBQVQsRUFBZTs7QUFFZDtBQUNBQztBQUNBQzs7QUFFQSxXQUFTQSxRQUFULEdBQW9CO0FBQ25CLFFBQU1DLFFBQVFDLFNBQVNDLGdCQUFULENBQTBCLGNBQTFCLENBQWQ7QUFDQUYsVUFBTUcsT0FBTixDQUFjO0FBQUEsYUFBU0MsS0FBS0MsT0FBTCxHQUFlQyxhQUF4QjtBQUFBLEtBQWQ7QUFDQTs7QUFFRCxXQUFTQSxhQUFULENBQXVCQyxDQUF2QixFQUEwQztBQUFBLFFBQWhCQyxPQUFnQix1RUFBTixJQUFNOztBQUN6QyxRQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsYUFBTUMsS0FBS0MsS0FBTCxDQUFXQyxHQUFHQyxxQkFBSCxHQUEyQkMsR0FBdEMsQ0FBTjtBQUFBLEtBQXRCOztBQUVBUCxNQUFFUSxjQUFGOztBQUVBLFFBQUlDLFdBQVlSLE9BQUQsR0FBWUEsUUFBUVMsWUFBUixDQUFxQixNQUFyQixDQUFaLEdBQTJDLEtBQUtBLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBMUQ7O0FBRUEsUUFBTUMsZUFBZWpCLFNBQVNrQixhQUFULENB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Q0FBaUIscUJBQWpCLENBQUosRUFBNkM7QUFDM0MsVUFBSVQsVUFBVVEsUUFBZCxFQUF3QjtBQUN4Qm5CLFFBQUVlLEtBQUYsRUFBU0UsR0FBVCxDQUFhLEVBQUVOLEtBQWY7QUFDRCxLQUhELE1BR087QUFDTCxVQUFJQSxVQUFVTyxRQUFkLEVBQXdCO0FBQ3hCbEIsUUFBRWUsS0FBRixFQUFTRSxHQUFULENBQWEsRUFBRU4sS0FBZjtBQUNEOztBQUVEWCxNQUFFYSxLQUFGLEVBQVNHLElBQVQsQ0FBYyxlQUFkLEVBQStCTixJQUEvQixDQUFvQ0MsS0FBcEM7QUFDRCxHQWxCRDs7QUFvQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQVgsSUFBRSxtQkFBRixFQUF1QnFCLElBQXZCLENBQTRCLG9CQUE1QjtBQUVELENBeE5ELEVBd05HekYsTUF4TkgiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAvLyBzdmcgZm9yIGFsbFxuICBzdmc0ZXZlcnlib2R5KClcbiAgc2Nyb2xsVG8oKVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFRvKCkge1xuICBcdGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYVtocmVmKj1cIiNcIl0nKVxuICBcdGxpbmtzLmZvckVhY2goZWFjaCA9PiAoZWFjaC5vbmNsaWNrID0gc2Nyb2xsQW5jaG9ycykpXG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxBbmNob3JzKGUsIHJlc3BvbmQgPSBudWxsKSB7XG4gIFx0Y29uc3QgZGlzdGFuY2VUb1RvcCA9IGVsID0+IE1hdGguZmxvb3IoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wKVxuXG4gIFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgXHRsZXQgdGFyZ2V0SUQgPSAocmVzcG9uZCkgPyByZXNwb25kLmdldEF0dHJpYnV0ZSgnaHJlZicpIDogdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuXG4gIFx0Y29uc3QgdGFyZ2V0QW5jaG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJRClcblxuICAgIGlmICghdGFyZ2V0QW5jaG9yKSByZXR1cm5cblxuICBcdGNvbnN0IG9yaWdpbmFsVG9wID0gZGlzdGFuY2VUb1RvcCh0YXJnZXRBbmNob3IpXG5cbiAgXHR3aW5kb3cuc2Nyb2xsQnkoeyB0b3A6IG9yaWdpbmFsVG9wLCBsZWZ0OiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSlcblxuICBcdGNvbnN0IGNoZWNrSWZEb25lID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gIFx0XHRjb25zdCBhdEJvdHRvbSA9IHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5wYWdlWU9mZnNldCA+PSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAtIDJcbiAgXHRcdGlmIChkaXN0YW5jZVRvVG9wKHRhcmdldEFuY2hvcikgPT09IDAgfHwgYXRCb3R0b20pIHtcbiAgXHRcdFx0dGFyZ2V0QW5jaG9yLnRhYkluZGV4ID0gJy0xJ1xuICBcdFx0XHR0YXJnZXRBbmNob3IuZm9jdXMoKVxuICBcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCB0YXJnZXRJRClcbiAgXHRcdFx0Y2xlYXJJbnRlcnZhbChjaGVja0lmRG9uZSlcbiAgXHRcdH1cbiAgXHR9LCAxMDApXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfYWN0aXZlJylcbiAgfVxuXG4gIC8vINCd0LDRgdGC0YDQvtC50LrQuCDRgdC70LDQudC00LXRgNC+0LIgZGF0YS1zbGlkZXJcbiAgY29uc3Qgc2xpZGVyT3B0aW9ucyA9IHtcbiAgICAnc2xpZGVyJzoge1xuICAgICAgY2VsbEFsaWduOiAnbGVmdCcsXG4gICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgY29udGFpbjogdHJ1ZSxcbiAgICAgIHByZXZOZXh0QnV0dG9uczogZmFsc2UsXG4gICAgICBwYWdlRG90czogdHJ1ZSxcbiAgICAgIGZyZWVTY3JvbGw6IGZhbHNlLFxuICAgICAgYXV0b1BsYXk6IHRydWVcbiAgICB9XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbGlkZXJdJykuZm9yRWFjaCgoc2xpZGVyLCBpKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1zbGlkZXNdJyksXG4gICAgICAgICAgc2xpZGVzQ291bnQgPSBzbGlkZXMuY2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICAgIHNsaWRlckRhdGEgPSBzbGlkZXIuZGF0YXNldC5zbGlkZXIsXG4gICAgICAgICAgb3B0aW9ucyA9IHNsaWRlck9wdGlvbnNbc2xpZGVyRGF0YV0sXG4gICAgICAgICAgaXRlbXMgPSBzbGlkZXIuZGF0YXNldC5pdGVtcywgLy8g0LrQvtC7LdCy0L4g0YHQu9Cw0LnQtNC+0LIg0L/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG4gICAgICAgICAgc2xpZGVyV2lkdGggPSBzbGlkZXIub2Zmc2V0V2lkdGhcblxuICAgIC8vINCX0LDQtNCw0ZHQvCDRiNC40YDQuNC90YMg0L7QtNC90L7Qs9C+INGB0LvQsNC50LTQsFxuICAgIGlmIChpdGVtcykge1xuICAgICAgQXJyYXkuZnJvbShzbGlkZXMuY2hpbGRyZW4pLmZvckVhY2goKHNsaWRlLCBrKSA9PiB7XG4gICAgICAgIHNsaWRlLnN0eWxlLndpZHRoID0gYCR7MTAwIC8gaXRlbXN9JWBcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3Qgc2xpZGVXaWR0aCA9IHNsaWRlcy5jaGlsZHJlblswXS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBzbGlkZXNDYXBhY2l0eSA9IE1hdGgucm91bmQoc2xpZGVyV2lkdGgvc2xpZGVXaWR0aCksXG4gICAgICAgICAgY29udHJvbHMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzXScpLFxuICAgICAgICAgIGNvbnRyb2xzRW5kSW5kZXggPSBzbGlkZXNDb3VudCAtIHNsaWRlc0NhcGFjaXR5LFxuICAgICAgICAgIGFkYXB0aXZlID0gTnVtYmVyKHNsaWRlci5kYXRhc2V0LnNsaWRlckFkYXB0aXZlKSxcbiAgICAgICAgICB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cbiAgICBsZXQgY29udHJvbHNQcmV2LCBjb250cm9sc05leHRcblxuICAgIGlmIChjb250cm9scykge1xuICAgICAgY29udHJvbHNQcmV2ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLXByZXZdJyksXG4gICAgICBjb250cm9sc05leHQgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtbmV4dF0nKVxuICAgIH1cblxuXG4gICAgaWYgKHNsaWRlc0NvdW50ID4gc2xpZGVzQ2FwYWNpdHkpIHtcbiAgICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfaW5pdGlhbCcpXG4gICAgICBjb25zdCBmbGt0eSA9IG5ldyBGbGlja2l0eShzbGlkZXMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgICAgY29udHJvbHNQcmV2XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkucHJldmlvdXMoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgY29udHJvbHNOZXh0XG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgZmxrdHkubmV4dCgpXG4gICAgICAgICAgfSlcblxuICAgICAgICBpZiAoIW9wdGlvbnMud3JhcEFyb3VuZCkge1xuICAgICAgICAgIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBjb250cm9sc1ByZXYuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChmbGt0eS5zZWxlY3RlZEluZGV4ID09PSBjb250cm9sc0VuZEluZGV4KSB7XG4gICAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmxrdHkub24oJ3NlbGVjdCcsIChpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29udHJvbHNQcmV2LmRpc2FibGVkID0gKGluZGV4ID09IDApID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgICBjb250cm9sc05leHQuZGlzYWJsZWQgPSAoaW5kZXggPT0gY29udHJvbHNFbmRJbmRleCkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgZmxrdHkub24oJ2NoYW5nZScsIChpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgZmxrdHkuc2VsZWN0KGNvbnRyb2xzRW5kSW5kZXgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvLyBkYXRlcGlja2VyXG5cbiAgdmFyIGRpc2FibGVkRGF5cyA9IFswLCA2XTtcblxuICAkKCcjY2FsZW5kYXInKS5kYXRlcGlja2VyKHtcbiAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgIGRheXM6ICdNTScsXG4gICAgICAgICAgbW9udGhzOiAneXl5eScsXG4gICAgICAgICAgeWVhcnM6ICd5eXl5MSAtIHl5eXkyJ1xuICAgICAgfVxuICB9KVxuXG4gICQoJy5uYXZpZ2F0b3JfX2l0ZW0gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIGNvbnN0IHJvb20gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKVxuXG4gICAgJChgW2RhdGEtcm9vbT1cIiR7cm9vbX1cIl1gKS5hZGRDbGFzcygnc2VjdGlvbl9fcm9vbV9hY3RpdmUnKVxuICB9KVxuXG4gICQoJy5iYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJCgnLnNlY3Rpb25fX3Jvb21fYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3NlY3Rpb25fX3Jvb21fYWN0aXZlJylcbiAgfSlcblxuICAkKCcucmFuZ2VfX2lucHV0IGlucHV0Jykub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAkKCcucmFuZ2VfX3ZhbHVlJykudGV4dCh0aGlzLnZhbHVlKTtcbiAgfSkudHJpZ2dlcihcImNoYW5nZVwiKTtcblxuICAkKCcucmFuZ2VfX2J1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIHZhciByYW5nZSA9ICQodGhpcykuY2xvc2VzdCgnLnJhbmdlJyksXG4gICAgICAgIGlucHV0ID0gJChyYW5nZSkuZmluZCgnaW5wdXQnKSxcbiAgICAgICAgdmFsdWUgPSBOdW1iZXIoJChpbnB1dCkudmFsKCkpLFxuICAgICAgICBtYXhWYWx1ZSA9IE51bWJlcigkKGlucHV0KS5hdHRyKCdtYXgnKSksXG4gICAgICAgIG1pblZhbHVlID0gTnVtYmVyKCQoaW5wdXQpLmF0dHIoJ21pbicpKVxuXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3JhbmdlX19idXR0b25fbWludXMnKSkge1xuICAgICAgaWYgKHZhbHVlID09PSBtaW5WYWx1ZSkgcmV0dXJuXG4gICAgICAkKGlucHV0KS52YWwoLS12YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlID09PSBtYXhWYWx1ZSkgcmV0dXJuXG4gICAgICAkKGlucHV0KS52YWwoKyt2YWx1ZSlcbiAgICB9XG5cbiAgICAkKHJhbmdlKS5maW5kKCcucmFuZ2VfX3ZhbHVlJykudGV4dCh2YWx1ZSlcbiAgfSlcblxuICAvLyBtb2RhbHNcblxuICAvLyAkKCdbZGF0YS1tb2RhbF0nKS5pemlNb2RhbCh7XG4gIC8vICAgZm9jdXNJbnB1dDogZmFsc2VcbiAgLy8gfSlcbiAgLy9cbiAgLy8gJCgnW2RhdGEtbW9kYWwtb3Blbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vXG4gIC8vICAgY29uc3QgZGF0YSA9ICQodGhpcykuZGF0YSgnbW9kYWwtb3BlbicpXG4gIC8vICAgJChgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYCkuaXppTW9kYWwoJ29wZW4nKVxuICAvLyB9KVxuICAvL1xuICAvLyAkKCcuaGVhZGVyX19tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQoJy5tZW51JykuYWRkQ2xhc3MoJ21lbnVfYWN0aXZlJylcbiAgLy8gfSlcbiAgLy9cbiAgLy8gJCgnLm1lbnVfX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQoJy5tZW51X2FjdGl2ZScpLnJlbW92ZUNsYXNzKCdtZW51X2FjdGl2ZScpXG4gIC8vIH0pXG4gIC8vXG4gIC8vICQoJ1tkYXRhLW1vZGFsLXNlbmRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQodGhpcykuY2xvc2VzdCgnLm1vZGFsJykuZmluZCgnLm1vZGFsX19jb250ZW50JykudG9nZ2xlKClcbiAgLy8gfSlcblxuICAvLyBtYXNrXG4gIC8vXG4gIC8vICQoJ1tkYXRhLW1hc2tlZF0nKS5lYWNoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gIC8vICAgY29uc3QgbWFzayA9ICQoaW5wdXQpLmRhdGEoJ21hc2tlZCcpXG4gIC8vXG4gIC8vICAgc3dpdGNoIChtYXNrKSB7XG4gIC8vICAgICBjYXNlICdwaG9uZSc6XG4gIC8vICAgICAgICQoaW5wdXQpLm1hc2soJys3ICgwMDApIDAwMC0wMC0wMCcpXG4gIC8vICAgfVxuICAvLyB9KVxuXG4gICQoJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nKS5tYXNrKCcrNyAoMDAwKSAwMDAtMDAtMDAnKVxuXG59KSh3aW5kb3cpO1xuIl19
