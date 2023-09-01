const settings = {
  calendarCars: {
    slidesPerView: "auto",
    spaceBetween: 30,
  },
};

document.querySelectorAll(".swiper").forEach((swiperSlider) => {
  const settingsKey = swiperSlider.getAttribute("data-swiper");
  const thumbsSelector = swiperSlider.getAttribute("data-swiper-thumbs");
  const parentElement = swiperSlider.hasAttribute("data-swiper-parent")
    ? document.querySelector(swiperSlider.getAttribute("data-swiper-parent"))
    : swiperSlider.parentElement;
  const prev = parentElement.querySelector(".swiper-arrow-prev");
  const next = parentElement.querySelector(".swiper-arrow-next");
  const dots = parentElement.querySelector(".swiper-dots");
  const scroll = parentElement.querySelector(".swiper-scrollbar");
  const thumbs = thumbsSelector ? document.querySelector(thumbsSelector) : null;

  new Swiper(swiperSlider, {
    ...settings[settingsKey],
    // // If we need pagination
    // pagination: {
    //   el: ".swiper-pagination",
    // },

    // // Navigation arrows
    navigation:
      next && prev
        ? {
            nextEl: next,
            prevEl: prev,
          }
        : {},
    scrollbar: scroll
      ? {
          el: scroll,
          hide: false,
          // draggable: true,
          enabled: true,
        }
      : {},
    pagination: dots
      ? {
          el: dots,
          clickable: true,
        }
      : {},
    thumbs: thumbs
      ? {
          swiper: thumbs,
        }
      : {},
  });
});
