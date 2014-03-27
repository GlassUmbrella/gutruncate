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

        var _showContent = function($element) {
            var moreLink = $(".gutruncate-more-link", $element);
            var moreContent = $(".gutruncate-more", $element);
            var ellipsis = $(".gutruncate-ellipsis", $element);

            $element.addClass("gutruncate_open");
            $element.removeClass("gutruncate_closed");
            moreContent.css("display", "inline");
            moreLink.text(options.readLessText);
            ellipsis.css("display", "none");
        };

        var _truncateContent = function($element) {
            var moreLink = $(".gutruncate-more-link", $element);
            var moreContent = $(".gutruncate-more", $element);
            var ellipsis = $(".gutruncate-ellipsis", $element);

            $element.removeClass("gutruncate_open");
            $element.addClass("gutruncate_closed");
            moreContent.css("display", "none");
            moreLink.text(options.readMoreText);
            ellipsis.css("display", "inline");
        };

        var _toggleContent = function() {
            $element = $(this).closest(".gutruncate");

            if ($element.hasClass("gutruncate_closed")) {
                _showContent($element);
            } else {
                _truncateContent($element);
            }
            return false;
        };

        return this.each(function(index, element) {

            $element = $(element);

            //Don't reapply
            if ($element.hasClass("gutruncate") && !options.reapply) {
                return true;
            }

            //Don't apply if isnt long enough
            var body = $element.html();
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
            $element.html(
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

            //Start off truncated
            _truncateContent($element);

            //Add click handler
            $(".gutruncate-more-link", $element).click(_toggleContent);

            //Finished
            $element.addClass("gutruncate");
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