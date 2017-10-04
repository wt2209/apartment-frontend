window.resizeContent = function(){
    let content = document.querySelector('section.content')
    let search = document.querySelector('section.content-header')
    let topNav = document.querySelector('header.main-header')
    let bottomNav = document.querySelector('div.footer')
    let height = document.documentElement.clientHeight
    if (search && search.clientHeight != undefined) {
      height -= search.clientHeight
    }
    if (topNav && topNav.clientHeight != undefined) {
      height -= topNav.clientHeight
    }
    if (bottomNav && bottomNav.clientHeight != undefined) {
      height -= bottomNav.clientHeight
    }
    if (content != null) {
      content.style.height = (height - 15) + 'px';
    }
}

window.addEventListener('resize', window.resizeContent)
