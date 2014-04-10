// The MIT License (MIT)

// Copyright (c) 2014 Glass Umbrella. Created by Eddie Lee.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

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
            var hiddenSection = body.substring(splitLocation);

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
        var _gutruncate = function(element, valueAccessor) {
            var binding = ko.unwrap(valueAccessor());
            var options = { };
            var text = "";

            if(binding === null) {
                binding = "";
            }

            if(typeof binding === "string") {
                text = binding;
            } else {
                text = ko.unwrap(binding.text);
                options = ko.unwrap(binding.options);
            }

            options.reapply = true;
            $(element).html(text);
            $(element).gutruncate(options);
        };

        ko.bindingHandlers.gutruncate = {
            init: _gutruncate,
            update: _gutruncate
        };
    }
})(jQuery);