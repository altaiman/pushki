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
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwibGlua3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWFjaCIsIm9uY2xpY2siLCJzY3JvbGxBbmNob3JzIiwiZSIsInJlc3BvbmQiLCJkaXN0YW5jZVRvVG9wIiwiTWF0aCIsImZsb29yIiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldElEIiwiZ2V0QXR0cmlidXRlIiwidGFyZ2V0QW5jaG9yIiwicXVlcnlTZWxlY3RvciIsIm9yaWdpbmFsVG9wIiwid2luZG93Iiwic2Nyb2xsQnkiLCJsZWZ0IiwiYmVoYXZpb3IiLCJjaGVja0lmRG9uZSIsInNldEludGVydmFsIiwiYXRCb3R0b20iLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0IiwiYm9keSIsIm9mZnNldEhlaWdodCIsInRhYkluZGV4IiwiZm9jdXMiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInNsaWRlck9wdGlvbnMiLCJjZWxsQWxpZ24iLCJ3cmFwQXJvdW5kIiwiY29udGFpbiIsInByZXZOZXh0QnV0dG9ucyIsInBhZ2VEb3RzIiwiZnJlZVNjcm9sbCIsImF1dG9QbGF5Iiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInNsaWRlc0NvdW50IiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJzbGlkZXJEYXRhIiwiZGF0YXNldCIsIm9wdGlvbnMiLCJpdGVtcyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJBcnJheSIsImZyb20iLCJzbGlkZSIsImsiLCJzdHlsZSIsIndpZHRoIiwic2xpZGVXaWR0aCIsInNsaWRlc0NhcGFjaXR5Iiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiY29udHJvbHNQcmV2IiwiY29udHJvbHNOZXh0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4Iiwic2VsZWN0IiwiJCIsImRhdGVwaWNrZXIiLCJuYXZUaXRsZXMiLCJkYXlzIiwibW9udGhzIiwieWVhcnMiLCJyb29tIiwiYXR0ciIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0ZXh0IiwidmFsdWUiLCJ0cmlnZ2VyIiwicmFuZ2UiLCJjbG9zZXN0IiwiaW5wdXQiLCJmaW5kIiwidmFsIiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsImhhc0NsYXNzIl0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsVUFBU0EsSUFBVCxFQUFlOztBQUVkO0FBQ0FDO0FBQ0FDOztBQUVBLFdBQVNBLFFBQVQsR0FBb0I7QUFDbkIsUUFBTUMsUUFBUUMsU0FBU0MsZ0JBQVQsQ0FBMEIsY0FBMUIsQ0FBZDtBQUNBRixVQUFNRyxPQUFOLENBQWM7QUFBQSxhQUFTQyxLQUFLQyxPQUFMLEdBQWVDLGFBQXhCO0FBQUEsS0FBZDtBQUNBOztBQUVELFdBQVNBLGFBQVQsQ0FBdUJDLENBQXZCLEVBQTBDO0FBQUEsUUFBaEJDLE9BQWdCLHVFQUFOLElBQU07O0FBQ3pDLFFBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0I7QUFBQSxhQUFNQyxLQUFLQyxLQUFMLENBQVdDLEdBQUdDLHFCQUFILEdBQTJCQyxHQUF0QyxDQUFOO0FBQUEsS0FBdEI7O0FBRUFQLE1BQUVRLGNBQUY7O0FBRUEsUUFBSUMsV0FBWVIsT0FBRCxHQUFZQSxRQUFRUyxZQUFSLENBQXFCLE1BQXJCLENBQVosR0FBMkMsS0FBS0EsWUFBTCxDQUFrQixNQUFsQixDQUExRDs7QUFFQSxRQUFNQyxlQUFlakIsU0FBU2tCLGFBQVQsQ0FBdUJILFFBQXZCLENBQXJCOztBQUVD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ZSxLQUFGLEVBQVNFLEdBQVQsQ0FBYSxFQUFFTixLQUFmO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsVUFBSUEsVUFBVU8sUUFBZCxFQUF3QjtBQUN4QmxCLFFBQUVlLEtBQUYsRUFBU0UsR0FBVCxDQUFhLEVBQUVOLEtBQWY7QUFDRDs7QUFFRFgsTUFBRWEsS0FBRixFQUFTRyxJQUFULENBQWMsZUFBZCxFQUErQk4sSUFBL0IsQ0FBb0NDLEtBQXBDO0FBQ0QsR0FsQkQ7O0FBb0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFRCxDQXBORCxFQW9ORzlFLE1BcE5IIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihyb290KSB7XG5cbiAgLy8gc3ZnIGZvciBhbGxcbiAgc3ZnNGV2ZXJ5Ym9keSgpXG4gIHNjcm9sbFRvKClcblxuICBmdW5jdGlvbiBzY3JvbGxUbygpIHtcbiAgXHRjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZio9XCIjXCJdJylcbiAgXHRsaW5rcy5mb3JFYWNoKGVhY2ggPT4gKGVhY2gub25jbGljayA9IHNjcm9sbEFuY2hvcnMpKVxuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsQW5jaG9ycyhlLCByZXNwb25kID0gbnVsbCkge1xuICBcdGNvbnN0IGRpc3RhbmNlVG9Ub3AgPSBlbCA9PiBNYXRoLmZsb29yKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcClcblxuICBcdGUucHJldmVudERlZmF1bHQoKVxuXG4gIFx0bGV0IHRhcmdldElEID0gKHJlc3BvbmQpID8gcmVzcG9uZC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA6IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJylcblxuICBcdGNvbnN0IHRhcmdldEFuY2hvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0SUQpXG5cbiAgICBpZiAoIXRhcmdldEFuY2hvcikgcmV0dXJuXG5cbiAgXHRjb25zdCBvcmlnaW5hbFRvcCA9IGRpc3RhbmNlVG9Ub3AodGFyZ2V0QW5jaG9yKVxuXG4gIFx0d2luZG93LnNjcm9sbEJ5KHsgdG9wOiBvcmlnaW5hbFRvcCwgbGVmdDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXG5cbiAgXHRjb25zdCBjaGVja0lmRG9uZSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICBcdFx0Y29uc3QgYXRCb3R0b20gPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyB3aW5kb3cucGFnZVlPZmZzZXQgPj0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgLSAyXG4gIFx0XHRpZiAoZGlzdGFuY2VUb1RvcCh0YXJnZXRBbmNob3IpID09PSAwIHx8IGF0Qm90dG9tKSB7XG4gIFx0XHRcdHRhcmdldEFuY2hvci50YWJJbmRleCA9ICctMSdcbiAgXHRcdFx0dGFyZ2V0QW5jaG9yLmZvY3VzKClcbiAgXHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgdGFyZ2V0SUQpXG4gIFx0XHRcdGNsZWFySW50ZXJ2YWwoY2hlY2tJZkRvbmUpXG4gIFx0XHR9XG4gIFx0fSwgMTAwKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKS5jbGFzc0xpc3QucmVtb3ZlKCdtZW51X2FjdGl2ZScpXG4gIH1cblxuICAvLyDQndCw0YHRgtGA0L7QudC60Lgg0YHQu9Cw0LnQtNC10YDQvtCyIGRhdGEtc2xpZGVyXG4gIGNvbnN0IHNsaWRlck9wdGlvbnMgPSB7XG4gICAgJ3NsaWRlcic6IHtcbiAgICAgIGNlbGxBbGlnbjogJ2xlZnQnLFxuICAgICAgd3JhcEFyb3VuZDogdHJ1ZSxcbiAgICAgIGNvbnRhaW46IHRydWUsXG4gICAgICBwcmV2TmV4dEJ1dHRvbnM6IGZhbHNlLFxuICAgICAgcGFnZURvdHM6IHRydWUsXG4gICAgICBmcmVlU2Nyb2xsOiBmYWxzZSxcbiAgICAgIGF1dG9QbGF5OiB0cnVlXG4gICAgfVxuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyXScpLmZvckVhY2goKHNsaWRlciwgaSkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItc2xpZGVzXScpLFxuICAgICAgICAgIHNsaWRlc0NvdW50ID0gc2xpZGVzLmNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICBzbGlkZXJEYXRhID0gc2xpZGVyLmRhdGFzZXQuc2xpZGVyLFxuICAgICAgICAgIG9wdGlvbnMgPSBzbGlkZXJPcHRpb25zW3NsaWRlckRhdGFdLFxuICAgICAgICAgIGl0ZW1zID0gc2xpZGVyLmRhdGFzZXQuaXRlbXMsIC8vINC60L7Quy3QstC+INGB0LvQsNC50LTQvtCyINC/0YDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuICAgICAgICAgIHNsaWRlcldpZHRoID0gc2xpZGVyLm9mZnNldFdpZHRoXG5cbiAgICAvLyDQl9Cw0LTQsNGR0Lwg0YjQuNGA0LjQvdGDINC+0LTQvdC+0LPQviDRgdC70LDQudC00LBcbiAgICBpZiAoaXRlbXMpIHtcbiAgICAgIEFycmF5LmZyb20oc2xpZGVzLmNoaWxkcmVuKS5mb3JFYWNoKChzbGlkZSwgaykgPT4ge1xuICAgICAgICBzbGlkZS5zdHlsZS53aWR0aCA9IGAkezEwMCAvIGl0ZW1zfSVgXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHNsaWRlV2lkdGggPSBzbGlkZXMuY2hpbGRyZW5bMF0ub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgc2xpZGVzQ2FwYWNpdHkgPSBNYXRoLnJvdW5kKHNsaWRlcldpZHRoL3NsaWRlV2lkdGgpLFxuICAgICAgICAgIGNvbnRyb2xzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9sc10nKSxcbiAgICAgICAgICBjb250cm9sc0VuZEluZGV4ID0gc2xpZGVzQ291bnQgLSBzbGlkZXNDYXBhY2l0eSxcbiAgICAgICAgICBhZGFwdGl2ZSA9IE51bWJlcihzbGlkZXIuZGF0YXNldC5zbGlkZXJBZGFwdGl2ZSksXG4gICAgICAgICAgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuXG4gICAgbGV0IGNvbnRyb2xzUHJldiwgY29udHJvbHNOZXh0XG5cbiAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgIGNvbnRyb2xzUHJldiA9IGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9scy1wcmV2XScpLFxuICAgICAgY29udHJvbHNOZXh0ID0gY29udHJvbHMucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNvbnRyb2xzLW5leHRdJylcbiAgICB9XG5cblxuICAgIGlmIChzbGlkZXNDb3VudCA+IHNsaWRlc0NhcGFjaXR5KSB7XG4gICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX2luaXRpYWwnKVxuICAgICAgY29uc3QgZmxrdHkgPSBuZXcgRmxpY2tpdHkoc2xpZGVzLCBvcHRpb25zKTtcblxuICAgICAgaWYgKGNvbnRyb2xzKSB7XG4gICAgICAgIGNvbnRyb2xzUHJldlxuICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGZsa3R5LnByZXZpb3VzKClcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGNvbnRyb2xzTmV4dFxuICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGZsa3R5Lm5leHQoKVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCFvcHRpb25zLndyYXBBcm91bmQpIHtcbiAgICAgICAgICBpZiAoZmxrdHkuc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgY29udHJvbHNQcmV2LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoZmxrdHkuc2VsZWN0ZWRJbmRleCA9PT0gY29udHJvbHNFbmRJbmRleCkge1xuICAgICAgICAgICAgY29udHJvbHNOZXh0LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZsa3R5Lm9uKCdzZWxlY3QnLCAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnRyb2xzUHJldi5kaXNhYmxlZCA9IChpbmRleCA9PSAwKSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgICAgY29udHJvbHNOZXh0LmRpc2FibGVkID0gKGluZGV4ID09IGNvbnRyb2xzRW5kSW5kZXgpID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZsa3R5Lm9uKCdjaGFuZ2UnLCAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBjb250cm9sc0VuZEluZGV4KSB7XG4gICAgICAgICAgICAgIGZsa3R5LnNlbGVjdChjb250cm9sc0VuZEluZGV4KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLy8gZGF0ZXBpY2tlclxuXG4gICQoJyNjYWxlbmRhcicpLmRhdGVwaWNrZXIoe1xuICAgICAgbmF2VGl0bGVzOiB7XG4gICAgICAgICAgZGF5czogJ01NJyxcbiAgICAgICAgICBtb250aHM6ICd5eXl5JyxcbiAgICAgICAgICB5ZWFyczogJ3l5eXkxIC0geXl5eTInXG4gICAgICB9XG4gIH0pXG5cbiAgJCgnLm5hdmlnYXRvcl9faXRlbSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgY29uc3Qgcm9vbSA9ICQodGhpcykuYXR0cignaHJlZicpXG5cbiAgICAkKGBbZGF0YS1yb29tPVwiJHtyb29tfVwiXWApLmFkZENsYXNzKCdzZWN0aW9uX19yb29tX2FjdGl2ZScpXG4gIH0pXG5cbiAgJCgnLmJhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAkKCcuc2VjdGlvbl9fcm9vbV9hY3RpdmUnKS5yZW1vdmVDbGFzcygnc2VjdGlvbl9fcm9vbV9hY3RpdmUnKVxuICB9KVxuXG4gICQoJy5yYW5nZV9faW5wdXQgaW5wdXQnKS5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICQoJy5yYW5nZV9fdmFsdWUnKS50ZXh0KHRoaXMudmFsdWUpO1xuICB9KS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXG4gICQoJy5yYW5nZV9fYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdmFyIHJhbmdlID0gJCh0aGlzKS5jbG9zZXN0KCcucmFuZ2UnKSxcbiAgICAgICAgaW5wdXQgPSAkKHJhbmdlKS5maW5kKCdpbnB1dCcpLFxuICAgICAgICB2YWx1ZSA9IE51bWJlcigkKGlucHV0KS52YWwoKSksXG4gICAgICAgIG1heFZhbHVlID0gTnVtYmVyKCQoaW5wdXQpLmF0dHIoJ21heCcpKSxcbiAgICAgICAgbWluVmFsdWUgPSBOdW1iZXIoJChpbnB1dCkuYXR0cignbWluJykpXG5cbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygncmFuZ2VfX2J1dHRvbl9taW51cycpKSB7XG4gICAgICBpZiAodmFsdWUgPT09IG1pblZhbHVlKSByZXR1cm5cbiAgICAgICQoaW5wdXQpLnZhbCgtLXZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgPT09IG1heFZhbHVlKSByZXR1cm5cbiAgICAgICQoaW5wdXQpLnZhbCgrK3ZhbHVlKVxuICAgIH1cblxuICAgICQocmFuZ2UpLmZpbmQoJy5yYW5nZV9fdmFsdWUnKS50ZXh0KHZhbHVlKVxuICB9KVxuXG4gIC8vIG1vZGFsc1xuXG4gIC8vICQoJ1tkYXRhLW1vZGFsXScpLml6aU1vZGFsKHtcbiAgLy8gICBmb2N1c0lucHV0OiBmYWxzZVxuICAvLyB9KVxuICAvL1xuICAvLyAkKCdbZGF0YS1tb2RhbC1vcGVuXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KClcbiAgLy9cbiAgLy9cbiAgLy8gICBjb25zdCBkYXRhID0gJCh0aGlzKS5kYXRhKCdtb2RhbC1vcGVuJylcbiAgLy8gICAkKGBbZGF0YS1tb2RhbD1cIiR7ZGF0YX1cIl1gKS5pemlNb2RhbCgnb3BlbicpXG4gIC8vIH0pXG4gIC8vXG4gIC8vICQoJy5oZWFkZXJfX21lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vICAgJCgnLm1lbnUnKS5hZGRDbGFzcygnbWVudV9hY3RpdmUnKVxuICAvLyB9KVxuICAvL1xuICAvLyAkKCcubWVudV9fY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vICAgJCgnLm1lbnVfYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ21lbnVfYWN0aXZlJylcbiAgLy8gfSlcbiAgLy9cbiAgLy8gJCgnW2RhdGEtbW9kYWwtc2VuZF0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vICAgJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKS5maW5kKCcubW9kYWxfX2NvbnRlbnQnKS50b2dnbGUoKVxuICAvLyB9KVxuXG4gIC8vIG1hc2tcbiAgLy9cbiAgLy8gJCgnW2RhdGEtbWFza2VkXScpLmVhY2goZnVuY3Rpb24oaSwgaW5wdXQpIHtcbiAgLy8gICBjb25zdCBtYXNrID0gJChpbnB1dCkuZGF0YSgnbWFza2VkJylcbiAgLy9cbiAgLy8gICBzd2l0Y2ggKG1hc2spIHtcbiAgLy8gICAgIGNhc2UgJ3Bob25lJzpcbiAgLy8gICAgICAgJChpbnB1dCkubWFzaygnKzcgKDAwMCkgMDAwLTAwLTAwJylcbiAgLy8gICB9XG4gIC8vIH0pXG5cbn0pKHdpbmRvdyk7XG4iXX0=
