import jQuery from "jquery";

export const scrolltop = () => {
    const body = jQuery("html, body");
    body.animate({
        scrollTop:0
    }, 300, 'linear', function() {
    });
}
