window.resizeContent = function(){
    let content = document.querySelector('section.content')
    let search = document.querySelector('section.content-header').clientHeight
    let topNav = document.querySelector('header.main-header').clientHeight
    let bottomNav = document.querySelector('div.footer').clientHeight
    let clientHeight = document.documentElement.clientHeight
    let height = clientHeight - search - topNav - bottomNav
    content.style.height = (height - 15) + 'px';
}

window.addEventListener('resize', window.resizeContent)
