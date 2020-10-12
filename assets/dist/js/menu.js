window.onload = function(){

    var btn = document.querySelector(".toggle-menu");
    btn.onclick = function( e ){
        var menu = document.querySelector(".menu-container")
        menu.classList.toggle('active');
    }
}