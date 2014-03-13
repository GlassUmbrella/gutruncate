(function($) {
    $.fn.gutruncate = function(options) {
        var defaults = {
            length: 150,
            minTrail: 20,
            moreText: "more",
            lessText: "less",
            ellipsisText: "...",
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
            if (body.length <= options.length + options.minTrail) {
                return true;
            }

            //Don't apply if is all one word
            var splitLocation = body.indexOf(" ", options.length);
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
                + "</span>"
            );

            //Hide hidden section
            element.find(".gutruncate-more").css("display", "none");

            //Add more link
            element.append(
                "<div>"
                + "<a href=\"javascript:void(0)\" class=\"gutruncate-more-link\">"
                + options.moreText
                + "</a>"
                + "</div>"
			);

            //Add click handler to hide/show
            var moreLink = $(".gutruncate-more-link", element);
            var moreContent = $(".gutruncate-more", element);
            var ellipsis = $(".gutruncate-ellipsis", element);

            moreLink.click(function() {
                if (moreLink.text() == options.moreText) {
                    moreContent.css("display", "inline");
                    moreLink.text(options.lessText);
                    ellipsis.css("display", "none");
                } else {
                    moreContent.css("display", "none");
                    moreLink.text(options.moreText);
                    ellipsis.css("display", "inline");
                }

                return false;
            });

            element.addClass("gutruncate");
        });
    };
})(jQuery);