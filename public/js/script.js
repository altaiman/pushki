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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyb290Iiwic3ZnNGV2ZXJ5Ym9keSIsInNjcm9sbFRvIiwibGlua3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWFjaCIsIm9uY2xpY2siLCJzY3JvbGxBbmNob3JzIiwiZSIsInJlc3BvbmQiLCJkaXN0YW5jZVRvVG9wIiwiTWF0aCIsImZsb29yIiwiZWwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldElEIiwiZ2V0QXR0cmlidXRlIiwidGFyZ2V0QW5jaG9yIiwicXVlcnlTZWxlY3RvciIsIm9yaWdpbmFsVG9wIiwid2luZG93Iiwic2Nyb2xsQnkiLCJsZWZ0IiwiYmVoYXZpb3IiLCJjaGVja0lmRG9uZSIsInNldEludGVydmFsIiwiYXRCb3R0b20iLCJpbm5lckhlaWdodCIsInBhZ2VZT2Zmc2V0IiwiYm9keSIsIm9mZnNldEhlaWdodCIsInRhYkluZGV4IiwiZm9jdXMiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2xlYXJJbnRlcnZhbCIsImNsYXNzTGlzdCIsInJlbW92ZSIsInNsaWRlck9wdGlvbnMiLCJjZWxsQWxpZ24iLCJ3cmFwQXJvdW5kIiwiY29udGFpbiIsInByZXZOZXh0QnV0dG9ucyIsInBhZ2VEb3RzIiwiZnJlZVNjcm9sbCIsImF1dG9QbGF5Iiwic2xpZGVyIiwiaSIsInNsaWRlcyIsInNsaWRlc0NvdW50IiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJzbGlkZXJEYXRhIiwiZGF0YXNldCIsIm9wdGlvbnMiLCJpdGVtcyIsInNsaWRlcldpZHRoIiwib2Zmc2V0V2lkdGgiLCJBcnJheSIsImZyb20iLCJzbGlkZSIsImsiLCJzdHlsZSIsIndpZHRoIiwic2xpZGVXaWR0aCIsInNsaWRlc0NhcGFjaXR5Iiwicm91bmQiLCJjb250cm9scyIsImNvbnRyb2xzRW5kSW5kZXgiLCJhZGFwdGl2ZSIsIk51bWJlciIsInNsaWRlckFkYXB0aXZlIiwid2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiY29udHJvbHNQcmV2IiwiY29udHJvbHNOZXh0IiwiYWRkIiwiZmxrdHkiLCJGbGlja2l0eSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmV2aW91cyIsIm5leHQiLCJzZWxlY3RlZEluZGV4IiwiZGlzYWJsZWQiLCJvbiIsImluZGV4Iiwic2VsZWN0IiwiJCIsImRhdGVwaWNrZXIiLCJuYXZUaXRsZXMiLCJkYXlzIiwibW9udGhzIiwieWVhcnMiLCJyb29tIiwiYXR0ciIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxVQUFTQSxJQUFULEVBQWU7O0FBRWQ7QUFDQUM7QUFDQUM7O0FBRUEsV0FBU0EsUUFBVCxHQUFvQjtBQUNuQixRQUFNQyxRQUFRQyxTQUFTQyxnQkFBVCxDQUEwQixjQUExQixDQUFkO0FBQ0FGLFVBQU1HLE9BQU4sQ0FBYztBQUFBLGFBQVNDLEtBQUtDLE9BQUwsR0FBZUMsYUFBeEI7QUFBQSxLQUFkO0FBQ0E7O0FBRUQsV0FBU0EsYUFBVCxDQUF1QkMsQ0FBdkIsRUFBMEM7QUFBQSxRQUFoQkMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFDekMsUUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLGFBQU1DLEtBQUtDLEtBQUwsQ0FBV0MsR0FBR0MscUJBQUgsR0FBMkJDLEdBQXRDLENBQU47QUFBQSxLQUF0Qjs7QUFFQVAsTUFBRVEsY0FBRjs7QUFFQSxRQUFJQyxXQUFZUixPQUFELEdBQVlBLFFBQVFTLFlBQVIsQ0FBcUIsTUFBckIsQ0FBWixHQUEyQyxLQUFLQSxZQUFMLENBQWtCLE1BQWxCLENBQTFEOztBQUVBLFFBQU1DLGVBQWVqQixTQUFTa0IsYUFBVCxDQUF1QkgsUUFBdkIsQ0FBckI7O0FBRUMsUUFBSSxDQUFDRSxZQUFMLEVBQW1COztBQUVwQixRQUFNRSxjQUFjWCxjQUFjUyxZQUFkLENBQXBCOztBQUVBRyxXQUFPQyxRQUFQLENBQWdCLEVBQUVSLEtBQUtNLFdB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LHVCQUFpQk0sSUFBakIsU0FBMkJFLFFBQTNCLENBQW9DLHNCQUFwQztBQUNELEdBTkQ7O0FBUUFSLElBQUUsT0FBRixFQUFXSCxFQUFYLENBQWMsT0FBZCxFQUF1QixVQUFTOUUsQ0FBVCxFQUFZO0FBQ2pDQSxNQUFFUSxjQUFGOztBQUVBeUUsTUFBRSx1QkFBRixFQUEyQlMsV0FBM0IsQ0FBdUMsc0JBQXZDO0FBQ0QsR0FKRDs7QUFNQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUQsQ0E1TEQsRUE0TEc1RSxNQTVMSCIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24ocm9vdCkge1xuXG4gIC8vIHN2ZyBmb3IgYWxsXG4gIHN2ZzRldmVyeWJvZHkoKVxuICBzY3JvbGxUbygpXG5cbiAgZnVuY3Rpb24gc2Nyb2xsVG8oKSB7XG4gIFx0Y29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWYqPVwiI1wiXScpXG4gIFx0bGlua3MuZm9yRWFjaChlYWNoID0+IChlYWNoLm9uY2xpY2sgPSBzY3JvbGxBbmNob3JzKSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbEFuY2hvcnMoZSwgcmVzcG9uZCA9IG51bGwpIHtcbiAgXHRjb25zdCBkaXN0YW5jZVRvVG9wID0gZWwgPT4gTWF0aC5mbG9vcihlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApXG5cbiAgXHRlLnByZXZlbnREZWZhdWx0KClcblxuICBcdGxldCB0YXJnZXRJRCA9IChyZXNwb25kKSA/IHJlc3BvbmQuZ2V0QXR0cmlidXRlKCdocmVmJykgOiB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpXG5cbiAgXHRjb25zdCB0YXJnZXRBbmNob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldElEKVxuXG4gICAgaWYgKCF0YXJnZXRBbmNob3IpIHJldHVyblxuXG4gIFx0Y29uc3Qgb3JpZ2luYWxUb3AgPSBkaXN0YW5jZVRvVG9wKHRhcmdldEFuY2hvcilcblxuICBcdHdpbmRvdy5zY3JvbGxCeSh7IHRvcDogb3JpZ2luYWxUb3AsIGxlZnQ6IDAsIGJlaGF2aW9yOiAnc21vb3RoJyB9KVxuXG4gIFx0Y29uc3QgY2hlY2tJZkRvbmUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgXHRcdGNvbnN0IGF0Qm90dG9tID0gd2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnBhZ2VZT2Zmc2V0ID49IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC0gMlxuICBcdFx0aWYgKGRpc3RhbmNlVG9Ub3AodGFyZ2V0QW5jaG9yKSA9PT0gMCB8fCBhdEJvdHRvbSkge1xuICBcdFx0XHR0YXJnZXRBbmNob3IudGFiSW5kZXggPSAnLTEnXG4gIFx0XHRcdHRhcmdldEFuY2hvci5mb2N1cygpXG4gIFx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIHRhcmdldElEKVxuICBcdFx0XHRjbGVhckludGVydmFsKGNoZWNrSWZEb25lKVxuICBcdFx0fVxuICBcdH0sIDEwMClcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9hY3RpdmUnKVxuICB9XG5cbiAgLy8g0J3QsNGB0YLRgNC+0LnQutC4INGB0LvQsNC50LTQtdGA0L7QsiBkYXRhLXNsaWRlclxuICBjb25zdCBzbGlkZXJPcHRpb25zID0ge1xuICAgICdzbGlkZXInOiB7XG4gICAgICBjZWxsQWxpZ246ICdsZWZ0JyxcbiAgICAgIHdyYXBBcm91bmQ6IHRydWUsXG4gICAgICBjb250YWluOiB0cnVlLFxuICAgICAgcHJldk5leHRCdXR0b25zOiBmYWxzZSxcbiAgICAgIHBhZ2VEb3RzOiB0cnVlLFxuICAgICAgZnJlZVNjcm9sbDogZmFsc2UsXG4gICAgICBhdXRvUGxheTogdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlcl0nKS5mb3JFYWNoKChzbGlkZXIsIGkpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXNsaWRlc10nKSxcbiAgICAgICAgICBzbGlkZXNDb3VudCA9IHNsaWRlcy5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgc2xpZGVyRGF0YSA9IHNsaWRlci5kYXRhc2V0LnNsaWRlcixcbiAgICAgICAgICBvcHRpb25zID0gc2xpZGVyT3B0aW9uc1tzbGlkZXJEYXRhXSxcbiAgICAgICAgICBpdGVtcyA9IHNsaWRlci5kYXRhc2V0Lml0ZW1zLCAvLyDQutC+0Lst0LLQviDRgdC70LDQudC00L7QsiDQv9GA0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40LhcbiAgICAgICAgICBzbGlkZXJXaWR0aCA9IHNsaWRlci5vZmZzZXRXaWR0aFxuXG4gICAgLy8g0JfQsNC00LDRkdC8INGI0LjRgNC40L3RgyDQvtC00L3QvtCz0L4g0YHQu9Cw0LnQtNCwXG4gICAgaWYgKGl0ZW1zKSB7XG4gICAgICBBcnJheS5mcm9tKHNsaWRlcy5jaGlsZHJlbikuZm9yRWFjaCgoc2xpZGUsIGspID0+IHtcbiAgICAgICAgc2xpZGUuc3R5bGUud2lkdGggPSBgJHsxMDAgLyBpdGVtc30lYFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBzbGlkZVdpZHRoID0gc2xpZGVzLmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoLFxuICAgICAgICAgIHNsaWRlc0NhcGFjaXR5ID0gTWF0aC5yb3VuZChzbGlkZXJXaWR0aC9zbGlkZVdpZHRoKSxcbiAgICAgICAgICBjb250cm9scyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHNdJyksXG4gICAgICAgICAgY29udHJvbHNFbmRJbmRleCA9IHNsaWRlc0NvdW50IC0gc2xpZGVzQ2FwYWNpdHksXG4gICAgICAgICAgYWRhcHRpdmUgPSBOdW1iZXIoc2xpZGVyLmRhdGFzZXQuc2xpZGVyQWRhcHRpdmUpLFxuICAgICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcblxuICAgIGxldCBjb250cm9sc1ByZXYsIGNvbnRyb2xzTmV4dFxuXG4gICAgaWYgKGNvbnRyb2xzKSB7XG4gICAgICBjb250cm9sc1ByZXYgPSBjb250cm9scy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY29udHJvbHMtcHJldl0nKSxcbiAgICAgIGNvbnRyb2xzTmV4dCA9IGNvbnRyb2xzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jb250cm9scy1uZXh0XScpXG4gICAgfVxuXG5cbiAgICBpZiAoc2xpZGVzQ291bnQgPiBzbGlkZXNDYXBhY2l0eSkge1xuICAgICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcl9pbml0aWFsJylcbiAgICAgIGNvbnN0IGZsa3R5ID0gbmV3IEZsaWNraXR5KHNsaWRlcywgb3B0aW9ucyk7XG5cbiAgICAgIGlmIChjb250cm9scykge1xuICAgICAgICBjb250cm9sc1ByZXZcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5wcmV2aW91cygpXG4gICAgICAgICAgfSlcblxuICAgICAgICBjb250cm9sc05leHRcbiAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBmbGt0eS5uZXh0KClcbiAgICAgICAgICB9KVxuXG4gICAgICAgIGlmICghb3B0aW9ucy53cmFwQXJvdW5kKSB7XG4gICAgICAgICAgaWYgKGZsa3R5LnNlbGVjdGVkSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xzUHJldi5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGZsa3R5LnNlbGVjdGVkSW5kZXggPT09IGNvbnRyb2xzRW5kSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRyb2xzTmV4dC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmbGt0eS5vbignc2VsZWN0JywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb250cm9sc1ByZXYuZGlzYWJsZWQgPSAoaW5kZXggPT0gMCkgPyB0cnVlIDogZmFsc2VcbiAgICAgICAgICAgIGNvbnRyb2xzTmV4dC5kaXNhYmxlZCA9IChpbmRleCA9PSBjb250cm9sc0VuZEluZGV4KSA/IHRydWUgOiBmYWxzZVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmbGt0eS5vbignY2hhbmdlJywgKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gY29udHJvbHNFbmRJbmRleCkge1xuICAgICAgICAgICAgICBmbGt0eS5zZWxlY3QoY29udHJvbHNFbmRJbmRleClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8vIGRhdGVwaWNrZXJcblxuICAkKCcjY2FsZW5kYXInKS5kYXRlcGlja2VyKHtcbiAgICAgIG5hdlRpdGxlczoge1xuICAgICAgICAgIGRheXM6ICdNTScsXG4gICAgICAgICAgbW9udGhzOiAneXl5eScsXG4gICAgICAgICAgeWVhcnM6ICd5eXl5MSAtIHl5eXkyJ1xuICAgICAgfVxuICB9KVxuXG4gICQoJy5uYXZpZ2F0b3JfX2l0ZW0gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIGNvbnN0IHJvb20gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKVxuXG4gICAgJChgW2RhdGEtcm9vbT1cIiR7cm9vbX1cIl1gKS5hZGRDbGFzcygnc2VjdGlvbl9fcm9vbV9hY3RpdmUnKVxuICB9KVxuXG4gICQoJy5iYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJCgnLnNlY3Rpb25fX3Jvb21fYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3NlY3Rpb25fX3Jvb21fYWN0aXZlJylcbiAgfSlcblxuICAvLyBtb2RhbHNcblxuICAvLyAkKCdbZGF0YS1tb2RhbF0nKS5pemlNb2RhbCh7XG4gIC8vICAgZm9jdXNJbnB1dDogZmFsc2VcbiAgLy8gfSlcbiAgLy9cbiAgLy8gJCgnW2RhdGEtbW9kYWwtb3Blbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIC8vXG4gIC8vXG4gIC8vICAgY29uc3QgZGF0YSA9ICQodGhpcykuZGF0YSgnbW9kYWwtb3BlbicpXG4gIC8vICAgJChgW2RhdGEtbW9kYWw9XCIke2RhdGF9XCJdYCkuaXppTW9kYWwoJ29wZW4nKVxuICAvLyB9KVxuICAvL1xuICAvLyAkKCcuaGVhZGVyX19tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQoJy5tZW51JykuYWRkQ2xhc3MoJ21lbnVfYWN0aXZlJylcbiAgLy8gfSlcbiAgLy9cbiAgLy8gJCgnLm1lbnVfX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQoJy5tZW51X2FjdGl2ZScpLnJlbW92ZUNsYXNzKCdtZW51X2FjdGl2ZScpXG4gIC8vIH0pXG4gIC8vXG4gIC8vICQoJ1tkYXRhLW1vZGFsLXNlbmRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKVxuICAvL1xuICAvLyAgICQodGhpcykuY2xvc2VzdCgnLm1vZGFsJykuZmluZCgnLm1vZGFsX19jb250ZW50JykudG9nZ2xlKClcbiAgLy8gfSlcblxuICAvLyBtYXNrXG4gIC8vXG4gIC8vICQoJ1tkYXRhLW1hc2tlZF0nKS5lYWNoKGZ1bmN0aW9uKGksIGlucHV0KSB7XG4gIC8vICAgY29uc3QgbWFzayA9ICQoaW5wdXQpLmRhdGEoJ21hc2tlZCcpXG4gIC8vXG4gIC8vICAgc3dpdGNoIChtYXNrKSB7XG4gIC8vICAgICBjYXNlICdwaG9uZSc6XG4gIC8vICAgICAgICQoaW5wdXQpLm1hc2soJys3ICgwMDApIDAwMC0wMC0wMCcpXG4gIC8vICAgfVxuICAvLyB9KVxuXG59KSh3aW5kb3cpO1xuIl19
