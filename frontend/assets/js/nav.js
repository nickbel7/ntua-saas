import $ from '../../bundles/node_modules/jquery';

// NAVBAR ACTIVE LINK
$('.nav-items li a').each(function() {
    var isActive = this.pathname === location.pathname;
    $(this).parent().toggleClass('active', isActive);
    var idA = $(this).attr('id');
    if (idA == 'home-a') {
        document.getElementById("home-img").classList.add('hover-img');
        document.getElementById('flows-li').onmouseover = function() {mouseOver3()}; 
        document.getElementById('flows-li').onmouseout = function() {mouseOut3()};
        document.getElementById('generation-li').onmouseover = function() {mouseOver2()}; 
        document.getElementById('generation-li').onmouseout = function() {mouseOut2()};
        document.getElementById('total-li').onmouseover = function() {mouseOver1()}; 
        document.getElementById('total-li').onmouseout = function() {mouseOut1()};
    }
    else if (idA == 'flows-a') {
        document.getElementById("flows-img").classList.add('hover-img3');
        document.getElementById('generation-li').onmouseover = function() {mouseOver2()}; 
        document.getElementById('generation-li').onmouseout = function() {mouseOut2()};
        document.getElementById('total-li').onmouseover = function() {mouseOver1()}; 
        document.getElementById('total-li').onmouseout = function() {mouseOut1()};
        document.getElementById('home-li').onmouseover = function() {mouseOver()}; 
        document.getElementById('home-li').onmouseout = function() {mouseOut()};
    }
    else if (idA == 'total-a') {
        document.getElementById("total-img").classList.add('hover-img1');
        document.getElementById('home-li').onmouseover = function() {mouseOver()}; 
        document.getElementById('home-li').onmouseout = function() {mouseOut()};
        document.getElementById('flows-li').onmouseover = function() {mouseOver3()}; 
        document.getElementById('flows-li').onmouseout = function() {mouseOut3()};
        document.getElementById('generation-li').onmouseover = function() {mouseOver2()}; 
        document.getElementById('generation-li').onmouseout = function() {mouseOut2()};
    }
    else if (idA == 'generation-a') {
        document.getElementById("generation-img").classList.add('hover-img2');
        document.getElementById('total-li').onmouseover = function() {mouseOver1()}; 
        document.getElementById('total-li').onmouseout = function() {mouseOut1()};
        document.getElementById('home-li').onmouseover = function() {mouseOver()}; 
        document.getElementById('home-li').onmouseout = function() {mouseOut()};
        document.getElementById('flows-li').onmouseover = function() {mouseOver3()}; 
        document.getElementById('flows-li').onmouseout = function() {mouseOut3()};
    }
});

function mouseOver3() {
    document.getElementById("flows-img").classList.add('hover-img3');
}

function mouseOut3() {
    document.getElementById("flows-img").classList.remove('hover-img3');
}

function mouseOver2() {
    document.getElementById("generation-img").classList.add('hover-img2');
}

function mouseOut2() {
    document.getElementById("generation-img").classList.remove('hover-img2');
}

function mouseOver1() {
    document.getElementById("total-img").classList.add('hover-img1');
}

function mouseOut1() {
    document.getElementById("total-img").classList.remove('hover-img1');
}

function mouseOver() {
    document.getElementById("home-img").classList.add('hover-img');
}

function mouseOut() {
    document.getElementById("home-img").classList.remove('hover-img');
}