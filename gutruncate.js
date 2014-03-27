(function($) {
    $.fn.gutruncate = function(options) {
        var defaults = {
            minLength: 150,
            tolerance: 20,
            readMoreText: "more",
            readLessText: "less",
            ellipsisText: "&hellip;",
            blockLevelMore: true,
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
                + "</span>"

                + (options.blockLevelMore ? "<div>" : " ")
                + "<a href=\"javascript:void(0)\" class=\"gutruncate-more-link\">"
                + options.readMoreText
                + "</a>"
                + (options.blockLevelMore ? "</div>" : "")
            );

            var moreLink = $(".gutruncate-more-link", element);
            var moreContent = $(".gutruncate-more", element);
            var ellipsis = $(".gutruncate-ellipsis", element);

            var _showContent = function() {
                element.addClass("gutruncate_open");
                element.removeClass("gutruncate_closed");
                moreContent.css("display", "inline");
                moreLink.text(options.readLessText);
                ellipsis.css("display", "none");
            };

            var _truncateContent = function() {
                element.removeClass("gutruncate_open");
                element.addClass("gutruncate_closed");
                moreContent.css("display", "none");
                moreLink.text(options.readMoreText);
                ellipsis.css("display", "inline");
            };

            //Start off truncated
            _truncateContent();

            //Add click handler
            moreLink.click(function() {
                if (element.hasClass("gutruncate_closed")) {
                    _showContent();
                } else {
                    _truncateContent();
                }
                return false;
            });

            element.addClass("gutruncate");
        });
    };

    if(ko !== undefined && ko.bindingHandlers !== undefined) {
        ko.bindingHandlers.gutruncate = {
            init: function(element, valueAccessor, allBindings) {
                var text = ko.unwrap(valueAccessor());

                var options = {
                    minLength: allBindings.get("minLength"),
                    tolerance: allBindings.get("tolerance"),
                    readMoreText: allBindings.get("readMoreText"),
                    readLessText: allBindings.get("readLessText"),
                    ellipsisText: allBindings.get("ellipsisText")
                };

                $(element).html(text);
                $(element).data("gutruncate_options", options);
                $(element).gutruncate(options);
            },
            update: function(element, valueAccessor, allBindings) {
                var text = ko.unwrap(valueAccessor());

                var options = $(element).data("gutruncate_options");
                options.reapply = true;

                $(element).html(text);
                $(element).gutruncate(options);
            }
        };
    }
})(jQuery);