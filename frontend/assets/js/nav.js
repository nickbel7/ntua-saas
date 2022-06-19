import $ from '../../bundles/node_modules/jquery';

// NAVBAR ACTIVE LINK
$('.nav-items li a').each(function() {
    var isActive = this.pathname === location.pathname;
    $(this).parent().toggleClass('active', isActive);
});

function onHover()
{
    $("#nav-img").attr('src', 'images/icons/icons-funel-white.png');
}

function offHover()
{
    $("#nav-img").attr('src', 'images/icons/icons-funel-black.png');
}
