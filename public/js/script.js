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

  $('input[type="tel"]').mask('+7 (000) 000-00-00');
})(window);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwibGlua3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWFjaCIsIm9uY2xpY2siLCJzY3JvbGxBbmNob3JzIiwiZSIsInJlc3BvbmQiLCJkaXN0YW5jZVRvVG9wIiwiTWF0aCIsImZsb29yIiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldElEIiwiZ2V0QXR0cmlidXRlIiwidGFyZ2V0QW5jaG9yIiwicXVlcnlTZWxlY3RvciIsIm9yaWdpbmFsVG9wIiwid2luZG93Iiwic2Nyb2xsQnkiLCJsZWZ0IiwiYmVoYXZpb3IiLCJjaGVja0lmRG9uZSIsInNldEludGVydmFsIiwiYXRCb3R0b20iLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0IiwiYm9keSIsIm9mZnNldEhlaWdodCIsInRhYkluZGV4IiwiZm9jdXMiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInNsaWRlck9wdGlvbnMiLCJjZWxsQWxpZ24iLCJ3cmFwQXJvdW5kIiwiY29udGFpbiIsInByZXZOZXh0QnV0dG9ucyIsInBhZ2VEb3RzIiwiZnJlZVNjcm9sbCIsImF1dG9QbGF5Iiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInNsaWRlc0NvdW50IiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJzbGlkZXJEYXRhIiwiZGF0YXNldCIsIm9wdGlvbnMiLCJpdGVtcyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJBcnJheSIsImZyb20iLCJzbGlkZSIsImsiLCJzdHlsZSIsIndpZHRoIiwic2xpZGVXaWR0aCIsInNsaWRlc0NhcGFjaXR5Iiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiY29udHJvbHNQcmV2IiwiY29udHJvbHNOZXh0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4Iiwic2VsZWN0IiwiJCIsImRhdGVwaWNrZXIiLCJuYXZUaXRsZXMiLCJkYXlzIiwibW9udGhzIiwieWVhcnMiLCJyb29tIiwiYXR0ciIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0ZXh0IiwidmFsdWUiLCJ0cmlnZ2VyIiwicmFuZ2UiLCJjbG9zZXN0IiwiaW5wdXQiLCJmaW5kIiwidmFsIiwibWF4VmFsdWUiLCJtaW5WYWx1ZSIsImhhc0NsYXNzIiwibWFzayJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFVBQVNBLElBQVQsRUFBZTs7QUFFZDtBQUNBQztBQUNBQzs7QUFFQSxXQUFTQSxRQUFULEdBQW9CO0FBQ25CLFFBQU1DLFFBQVFDLFNBQVNDLGdCQUFULENBQTBCLGNBQTFCLENBQWQ7QUFDQUYsVUFBTUcsT0FBTixDQUFjO0FBQUEsYUFBU0MsS0FBS0MsT0FBTCxHQUFlQyxhQUF4QjtBQUFBLEtBQWQ7QUFDQTs7QUFFRCxXQUFTQSxhQUFULENBQXVCQyxDQUF2QixFQUEwQztBQUFBLFFBQWhCQyxPQUFnQix1RUFBTixJQUFNOztBQUN6QyxRQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsYUFBTUMsS0FBS0MsS0FBTCxDQUFXQyxHQUFHQyxxQkFBSCxHQUEyQkMsR0FBdEMsQ0FBTjtBQUFBLEtBQXRCOztBQUVBUCxNQUFFUSxjQUFGOztBQUVBLFFBQUlDLFdBQVlSLE9BQUQsR0FBWUEsUUFBUVMsWUFBUixDQUFxQixNQUFyQixDQUFaLEdBQTJDLEtBQUtBLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBMUQ7O0FBRUEsUUFBTUMsZUFBZWpCLFNBQVNrQixhQUFULENBQXVCSCxRQUF2QixDQUFy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bkIsUUFBRWUsS0FBRixFQUFTRSxHQUFULENBQWEsRUFBRU4sS0FBZjtBQUNELEtBSEQsTUFHTztBQUNMLFVBQUlBLFVBQVVPLFFBQWQsRUFBd0I7QUFDeEJsQixRQUFFZSxLQUFGLEVBQVNFLEdBQVQsQ0FBYSxFQUFFTixLQUFmO0FBQ0Q7O0FBRURYLE1BQUVhLEtBQUYsRUFBU0csSUFBVCxDQUFjLGVBQWQsRUFBK0JOLElBQS9CLENBQW9DQyxLQUFwQztBQUNELEdBbEJEOztBQW9CQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBWCxJQUFFLG1CQUFGLEVBQXVCcUIsSUFBdkIsQ0FBNEIsb0JBQTVCO0FBRUQsQ0F0TkQsRUFzTkd4RixNQXROSCIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24ocm9vdCkge1xuXG4gIC8vIHN2ZyBmb3IgYWxsXG4gIHN2ZzRldmVyeWJvZHkoKVxuICBzY3JvbGxUbygpXG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG8oKSB7XG4gIFx0Y29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWYqPVwiI1wiXScpXG4gIFx0bGlua3MuZm9yRWFjaChlYWNoID0+IChlYWNoLm9uY2xpY2sgPSBzY3JvbGxBbmNob3JzKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbEFuY2hvcnMoZSwgcmVzcG9uZCA9IG51bGwpIHtcbiAgXHRjb25zdCBkaXN0YW5jZVRvVG9wID0gZWwgPT4gTWF0aC5mbG9vcihlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApXG5cbiAgXHRlLnByZXZlbnREZWZhdWx0KClcblxuICBcdGxldCB0YXJnZXRJRCA9IChyZXNwb25kKSA/IHJlc3BvbmQuZ2V0QXR0cmlidXRlKCdocmVmJykgOiB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpXG5cbiAgXHRjb25zdCB0YXJnZXRBbmNob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElEKVxuXG4gICAgaWYgKCF0YXJnZXRBbmNob3IpIHJldHVyblxuXG4gIFx0Y29uc3Qgb3JpZ2luYWxUb3AgPSBkaXN0YW5jZVRvVG9wKHRhcmdldEFuY2hvcilcblxuICBcdHdpbmRvdy5zY3JvbGxCeSh7IHRvcDogb3JpZ2luYWxUb3AsIGxlZnQ6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxuXG4gIFx0Y29uc3QgY2hlY2tJZkRvbmUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgXHRcdGNvbnN0IGF0Qm90dG9tID0gd2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnBhZ2VZT2Zmc2V0ID49IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gMlxuICBcdFx0aWYgKGRpc3RhbmNlVG9Ub3AodGFyZ2V0QW5jaG9yKSA9PT0gMCB8fCBhdEJvdHRvbSkge1xuICBcdFx0XHR0YXJnZXRBbmNob3IudGFiSW5kZXggPSAnLTEnXG4gIFx0XHRcdHRhcmdldEFuY2hvci5mb2N1cygpXG4gIFx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIHRhcmdldElEKVxuICBcdFx0XHRjbGVhckludGVydmFsKGNoZWNrSWZEb25lKVxuICBcdFx0fVxuICBcdH0sIDEwMClcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9hY3RpdmUnKVxuICB9XG5cbiAgLy8g0J3QsNGB0YLRgNC+0LnQutC4INGB0LvQsNC50LTQtdGA0L7QsiBkYXRhLXNsaWRlclxuICBjb25zdCBzbGlkZXJPcHRpb25zID0ge1xuICAgICdzbGlkZXInOiB7XG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIHBhZ2VEb3RzOiB0cnVlLFxuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBhdXRvUGxheTogdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlcl0nKS5mb3JFYWNoKChzbGlkZXIsIGkpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXNsaWRlc10nKSxcbiAgICAgICAgICBzbGlkZXNDb3VudCA9IHNsaWRlcy5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgc2xpZGVyRGF0YSA9IHNsaWRlci5kYXRhc2V0LnNsaWRlcixcbiAgICAgICAgICBvcHRpb25zID0gc2xpZGVyT3B0aW9uc1tzbGlkZXJEYXRhXSxcbiAgICAgICAgICBpdGVtcyA9IHNsaWRlci5kYXRhc2V0Lml0ZW1zLCAvLyDQutC+0Lst0LLQviDRgdC70LDQudC00L7QsiDQv9GA0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40LhcbiAgICAgICAgICBzbGlkZXJXaWR0aCA9IHNsaWRlci5vZmZzZXRXaWR0aFxuXG4gICAgLy8g0JfQsNC00LDRkdC8INGI0LjRgNC40L3RgyDQvtC00L3QvtCz0L4g0YHQu9Cw0LnQtNCwXG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICBBcnJheS5mcm9tKHNsaWRlcy5jaGlsZHJlbikuZm9yRWFjaCgoc2xpZGUsIGspID0+IHtcbiAgICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSBgJHsxMDAgLyBpdGVtc30lYFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNFbmRJbmRleCA9IHNsaWRlc0NvdW50IC0gc2xpZGVzQ2FwYWNpdHksXG4gICAgICAgICAgYWRhcHRpdmUgPSBOdW1iZXIoc2xpZGVyLmRhdGFzZXQuc2xpZGVyQWRhcHRpdmUpLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcblxuICAgIGxldCBjb250cm9sc1ByZXYsIGNvbnRyb2xzTmV4dFxuXG4gICAgaWYgKGNvbnRyb2xzKSB7XG4gICAgICBjb250cm9sc1ByZXYgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtcHJldl0nKSxcbiAgICAgIGNvbnRyb2xzTmV4dCA9IGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9scy1uZXh0XScpXG4gICAgfVxuXG5cbiAgICBpZiAoc2xpZGVzQ291bnQgPiBzbGlkZXNDYXBhY2l0eSkge1xuICAgICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9pbml0aWFsJylcbiAgICAgIGNvbnN0IGZsa3R5ID0gbmV3IEZsaWNraXR5KHNsaWRlcywgb3B0aW9ucyk7XG5cbiAgICAgIGlmIChjb250cm9scykge1xuICAgICAgICBjb250cm9sc1ByZXZcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5wcmV2aW91cygpXG4gICAgICAgICAgfSlcblxuICAgICAgICBjb250cm9sc05leHRcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5uZXh0KClcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGlmICghb3B0aW9ucy53cmFwQXJvdW5kKSB7XG4gICAgICAgICAgaWYgKGZsa3R5LnNlbGVjdGVkSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzUHJldi5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGZsa3R5LnNlbGVjdGVkSW5kZXggPT09IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRyb2xzTmV4dC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmbGt0eS5vbignc2VsZWN0JywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb250cm9sc1ByZXYuZGlzYWJsZWQgPSAoaW5kZXggPT0gMCkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIGNvbnRyb2xzTmV4dC5kaXNhYmxlZCA9IChpbmRleCA9PSBjb250cm9sc0VuZEluZGV4KSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmbGt0eS5vbignY2hhbmdlJywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gY29udHJvbHNFbmRJbmRleCkge1xuICAgICAgICAgICAgICBmbGt0eS5zZWxlY3QoY29udHJvbHNFbmRJbmRleClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8vIGRhdGVwaWNrZXJcblxuICAkKCcjY2FsZW5kYXInKS5kYXRlcGlja2VyKHtcbiAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgIGRheXM6ICdNTScsXG4gICAgICAgICAgbW9udGhzOiAneXl5eScsXG4gICAgICAgICAgeWVhcnM6ICd5eXl5MSAtIHl5eXkyJ1xuICAgICAgfVxuICB9KVxuXG4gICQoJy5uYXZpZ2F0b3JfX2l0ZW0gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIGNvbnN0IHJvb20gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKVxuXG4gICAgJChgW2RhdGEtcm9vbT1cIiR7cm9vbX1cIl1gKS5hZGRDbGFzcygnc2VjdGlvbl9fcm9vbV9hY3RpdmUnKVxuICB9KVxuXG4gICQoJy5iYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJCgnLnNlY3Rpb25fX3Jvb21fYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3NlY3Rpb25fX3Jvb21fYWN0aXZlJylcbiAgfSlcblxuICAkKCcucmFuZ2VfX2lucHV0IGlucHV0Jykub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAkKCcucmFuZ2VfX3ZhbHVlJykudGV4dCh0aGlzLnZhbHVlKTtcbiAgfSkudHJpZ2dlcihcImNoYW5nZVwiKTtcblxuICAkKCcucmFuZ2VfX2J1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIHZhciByYW5nZSA9ICQodGhpcykuY2xvc2VzdCgnLnJhbmdlJyksXG4gICAgICAgIGlucHV0ID0gJChyYW5nZSkuZmluZCgnaW5wdXQnKSxcbiAgICAgICAgdmFsdWUgPSBOdW1iZXIoJChpbnB1dCkudmFsKCkpLFxuICAgICAgICBtYXhWYWx1ZSA9IE51bWJlcigkKGlucHV0KS5hdHRyKCdtYXgnKSksXG4gICAgICAgIG1pblZhbHVlID0gTnVtYmVyKCQoaW5wdXQpLmF0dHIoJ21pbicpKVxuXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3JhbmdlX19idXR0b25fbWludXMnKSkge1xuICAgICAgaWYgKHZhbHVlID09PSBtaW5WYWx1ZSkgcmV0dXJuXG4gICAgICAkKGlucHV0KS52YWwoLS12YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlID09PSBtYXhWYWx1ZSkgcmV0dXJuXG4gICAgICAkKGlucHV0KS52YWwoKyt2YWx1ZSlcbiAgICB9XG5cbiAgICAkKHJhbmdlKS5maW5kKCcucmFuZ2VfX3ZhbHVlJykudGV4dCh2YWx1ZSlcbiAgfSlcblxuICAvLyBtb2RhbHNcblxuICAvLyAkKCdbZGF0YS1tb2RhbF0nKS5pemlNb2RhbCh7XG4gIC8vICAgZm9jdXNJbnB1dDogZmFsc2VcbiAgLy8gfSlcbiAgLy9cbiAgLy8gJCgnW2RhdGEtbW9kYWwtb3Blbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vXG4gIC8vICAgY29uc3QgZGF0YSA9ICQodGhpcykuZGF0YSgnbW9kYWwtb3BlbicpXG4gIC8vICAgJChgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYCkuaXppTW9kYWwoJ29wZW4nKVxuICAvLyB9KVxuICAvL1xuICAvLyAkKCcuaGVhZGVyX19tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQoJy5tZW51JykuYWRkQ2xhc3MoJ21lbnVfYWN0aXZlJylcbiAgLy8gfSlcbiAgLy9cbiAgLy8gJCgnLm1lbnVfX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQoJy5tZW51X2FjdGl2ZScpLnJlbW92ZUNsYXNzKCdtZW51X2FjdGl2ZScpXG4gIC8vIH0pXG4gIC8vXG4gIC8vICQoJ1tkYXRhLW1vZGFsLXNlbmRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQodGhpcykuY2xvc2VzdCgnLm1vZGFsJykuZmluZCgnLm1vZGFsX19jb250ZW50JykudG9nZ2xlKClcbiAgLy8gfSlcblxuICAvLyBtYXNrXG4gIC8vXG4gIC8vICQoJ1tkYXRhLW1hc2tlZF0nKS5lYWNoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gIC8vICAgY29uc3QgbWFzayA9ICQoaW5wdXQpLmRhdGEoJ21hc2tlZCcpXG4gIC8vXG4gIC8vICAgc3dpdGNoIChtYXNrKSB7XG4gIC8vICAgICBjYXNlICdwaG9uZSc6XG4gIC8vICAgICAgICQoaW5wdXQpLm1hc2soJys3ICgwMDApIDAwMC0wMC0wMCcpXG4gIC8vICAgfVxuICAvLyB9KVxuXG4gICQoJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nKS5tYXNrKCcrNyAoMDAwKSAwMDAtMDAtMDAnKVxuXG59KSh3aW5kb3cpO1xuIl19
