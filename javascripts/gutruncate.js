(function($) {
    $.fn.gutruncate = function(options) {
        var defaults = {
            minLength: 150,
            tolerance: 20,
            readMoreText: "more",
            readLessText: "less",
            ellipsisText: "&hellip;",
            reapply: false
        };

        var options = $.extend(defaults, options);

        return this.each(function() {
            element = $(this);            

            //Don't reapply
            if (element.hasClass("gutruncate") && !options.reapply) {
                return true;
            }

            //Don't apply if isnt long enough
            var body = element.html();
            if (body.length <= options.minLength + options.tolerance) {
                return true;
            }

            //Don't apply if is all one word
            var splitLocation = body.indexOf(" ", options.minLength);
            if (splitLocation === -1) {
                return true;
            }

            //Split text
            var visibleSection = body.substring(0, splitLocation);
            var hiddenSection = body.substring(splitLocation, body.length - 1);

            //Update DOM
            element.html(
                visibleSection
                + "<span class=\"gutruncate-ellipsis\">"
                + options.ellipsisText
                + "</span>"
                + "<span class=\"gutruncate-more\">"
                + hiddenSection
                + "</span><div>"
                + "<a href=\"javascript:void(0)\" class=\"gutruncate-more-link\">"
                + options.readMoreText
                + "</a>"
                + "</div>"
            );

            //Hide hidden section
            element.find(".gutruncate-more").css("display", "none");

            //Add click handler to hide/show
            var moreLink = $(".gutruncate-more-link", element);
            var moreContent = $(".gutruncate-more", element);
            var ellipsis = $(".gutruncate-ellipsis", element);

            moreLink.click(function() {
                if (moreLink.text() == options.readMoreText) {
                    moreContent.css("display", "inline");
                    moreLink.text(options.readLessText);
                    ellipsis.css("display", "none");
                } else {
                    moreContent.css("display", "none");
                    moreLink.text(options.readMoreText);
                    ellipsis.css("display", "inline");
                }

                return false;
            });

            element.addClass("gutruncate");
        });
    };
})(jQuery);