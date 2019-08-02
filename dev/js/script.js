(function(root) {

  // svg for all
  svg4everybody()
  scrollTo()

  function scrollTo() {
  	const links = document.querySelectorAll('a[href*="#"]')
  	links.forEach(each => (each.onclick = scrollAnchors))
  }

  function scrollAnchors(e, respond = null) {
  	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top)

  	e.preventDefault()

  	let targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href')

  	const targetAnchor = document.querySelector(targetID)

    if (!targetAnchor) return

  	const originalTop = distanceToTop(targetAnchor)

  	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })

  	const checkIfDone = setInterval(function() {
  		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
  		if (distanceToTop(targetAnchor) === 0 || atBottom) {
  			targetAnchor.tabIndex = '-1'
  			targetAnchor.focus()
  			window.history.pushState('', '', targetID)
  			clearInterval(checkIfDone)
  		}
  	}, 100)

    document.querySelector('.menu').classList.remove('menu_active')
  }

  // Настройки слайдеров data-slider
  const sliderOptions = {
    'slider': {
      cellAlign: 'left',
      wrapAround: true,
      contain: true,
      prevNextButtons: false,
      pageDots: true,
      freeScroll: false,
      autoPlay: true
    }
  }

  document.querySelectorAll('[data-slider]').forEach((slider, i) => {
    const slides = slider.querySelector('[data-slider-slides]'),
          slidesCount = slides.children.length,
          sliderData = slider.dataset.slider,
          options = sliderOptions[sliderData],
          items = slider.dataset.items, // кол-во слайдов при инициализации
          sliderWidth = slider.offsetWidth

    // Задаём ширину одного слайда
    if (items) {
      Array.from(slides.children).forEach((slide, k) => {
        slide.style.width = `${100 / items}%`
      })
    }

    const slideWidth = slides.children[0].offsetWidth,
          slidesCapacity = Math.round(sliderWidth/slideWidth),
          controls = slider.querySelector('[data-slider-controls]'),
          controlsEndIndex = slidesCount - slidesCapacity,
          adaptive = Number(slider.dataset.sliderAdaptive),
          windowWidth = window.innerWidth

    let controlsPrev, controlsNext

    if (controls) {
      controlsPrev = controls.querySelector('[data-slider-controls-prev]'),
      controlsNext = controls.querySelector('[data-slider-controls-next]')
    }


    if (slidesCount > slidesCapacity) {
      slider.classList.add('slider_initial')
      const flkty = new Flickity(slides, options);

      if (controls) {
        controlsPrev
          .addEventListener('click', (e) => {
            e.preventDefault()
            flkty.previous()
          })

        controlsNext
          .addEventListener('click', (e) => {
            e.preventDefault()
            flkty.next()
          })

        if (!options.wrapAround) {
          if (flkty.selectedIndex === 0) {
            controlsPrev.disabled = true
          } else if (flkty.selectedIndex === controlsEndIndex) {
            controlsNext.disabled = true
          }

          flkty.on('select', (index) => {
            controlsPrev.disabled = (index == 0) ? true : false
            controlsNext.disabled = (index == controlsEndIndex) ? true : false
          })

          flkty.on('change', (index) => {
            if (index >= controlsEndIndex) {
              flkty.select(controlsEndIndex)
            }
          })
        }
      }
    }
  })

  // datepicker

  $('#calendar').datepicker({
      navTitles: {
          days: 'MM',
          months: 'yyyy',
          years: 'yyyy1 - yyyy2'
      }
  })

  $('.navigator__item a').on('click', function(e) {
    e.preventDefault()

    const room = $(this).attr('href')

    $(`[data-room="${room}"]`).addClass('section__room_active')
  })

  $('.back').on('click', function(e) {
    e.preventDefault()

    $('.section__room_active').removeClass('section__room_active')
  })

  $('.range__input input').on("input", function() {
    $('.range__value').text(this.value);
  }).trigger("change");

  $('.range__button').on('click', function(e) {
    e.preventDefault()

    var range = $(this).closest('.range'),
        input = $(range).find('input'),
        value = Number($(input).val()),
        maxValue = Number($(input).attr('max')),
        minValue = Number($(input).attr('min'))

    if ($(this).hasClass('range__button_minus')) {
      if (value === minValue) return
      $(input).val(--value)
    } else {
      if (value === maxValue) return
      $(input).val(++value)
    }

    $(range).find('.range__value').text(value)
  })

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
