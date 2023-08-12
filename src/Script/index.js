$(document).ready(() => {
  // Trigger Navigation toggle button
  $('.trigger').on('click', function () {
    $(this).toggleClass('active')
    $('.gnb').toggleClass('active')
  })
  // Trigger .gnb a 클릭 시 해당 위치로 스크롤 후 네비게이션 닫힘.
  $('.gnb a').on('click', function () {
    $('.gnb, .trigger').removeClass('active')
  })

  // jQuery.scrollTo
  $('.gnb a, .goToTop').on('click', function (e) {
    $.scrollTo(this.hash || 0, 800)
    e.preventDefault()
  })

  // scroll down 시 active class 추가
  $(window).on('scroll', () => {
    $(window).scrollTop() > 50 ? $('header, .goToTop').addClass('active') : $('header, .goToTop').removeClass('active')
  })
})
