$(window).on('scroll', function () {
    var $toolbar = $("#toolbar");
    var $toolbar_content = $("#toolbar-content");
    var $toolbar_spacer = $("#toolbar-spacer");

    if ($toolbar.length && $toolbar_content.length && $toolbar_spacer.length){
        var $main_menu = $("#main-menu");

        var toolbar_offset = $toolbar.offset().top;
        var toolbar_height = $toolbar_content.outerHeight();
        var main_menu_height = $main_menu.outerHeight();

        toolbar_offset = toolbar_offset - main_menu_height;

        if ($(window).scrollTop() > toolbar_offset) {
            $toolbar.addClass("fixed")
            $toolbar_content.css({ "top": main_menu_height });
            $toolbar_spacer.height(toolbar_height);
        } else {
            $toolbar.removeClass("fixed");
            $toolbar_content.css({ "top": 0 });;
            $toolbar_spacer.height(0)
        }
    }
});