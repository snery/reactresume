$(function () {
    $(".hamburger-menu a").on('keypress click', function (e) {
        if (e.which === 13 || e.type === 'click')
            $('#menuButton').click();
    });
});