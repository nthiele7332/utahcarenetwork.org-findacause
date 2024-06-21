import searchMap from '@config/search-map';

(function ($) {
    $.fn.filterBy = function (queryClass) {
        // Extract items from page
        let items = [];
        const placeholders = [];

        const emptyItems = [];

        // map classes from given query
        const filterClasses = [];
        Object.entries(searchMap).forEach(([key, value]) => {
            if (key.toLowerCase().includes(queryClass.toLowerCase())) {
                if (Array.isArray(value)) {
                    filterClasses.push(...value);
                } else {
                    filterClasses.push(value);
                }
            }
        });

        let elementIndex = 0;

        // Loop throw each item from hidden container and clone it
        $('#et_hidden_container').children().each((index, elem) => {
            const clone = $(elem).clone();

            // Remove last child class, so we can add it later after sorting the list
            clone.removeClass('et-last-child');

            // check if realtor is empty block
            if (clone.hasClass('et_pb_column_empty')) {
                emptyItems.push(clone);
            } else {
                filterClasses.forEach((filter) => {
                    if (
                        (
                            filter !== 'dfc-utahc'
                            && filter !== 'dfc-davisc'
                            && filter !== 'dfc-saltlakec'
                            && filter !== 'dfc-weberc'
                            && filter !== 'dfc-cachec'
                            && filter !== 'dfc-wasatchc'
                            && filter !== 'dfc-juabc'
                            && filter !== 'dfc-washingtonc'
                        )
                        && clone.attr('class').includes(filter)
                    ) {
                        items.push(clone);
                    } else if (clone.attr('class').includes(filter)) {
                        placeholders.push(clone);
                    }
                });
            }

            const numberString = elementIndex.toString().padStart(3, '0');

            clone.addClass(`df-elementindex-${numberString} df-animation`);
            elementIndex += 1;
        });

        // when listing is not found in a city, county based replacements takes place
        if (items.length === 0) {
            items = placeholders.slice();
        }

        // Add et-last-child class to each 3rd element
        $.each(items, (index, elem) => {
            // Note: If strict comparision breaks this operation, rollback to the non-strict version
            if ((index + 1) % 3 === 0) {
                elem.addClass('et-last-child');
            }
        });

        const totalItems = items.length;
        const totalElements = $('#et_hidden_container').children().length;
        const totalRows = Math.ceil(totalElements / 3);

        const parent = $('div.dfc-realtors');

        // empty all elements
        parent.empty();

        // No results found based on the query
        if (totalItems === 0) {
            // Create a new div element
            const newDiv = $('<div></div>');

            // Add a class to the new div
            newDiv.addClass('et_pb_row et_pb_row_2 et_pb_gutters2');

            newDiv.html('<div class="et_pb_module et_pb_text_align_center"><h3 class="et_no_search_results">No results found.</h3></div>');

            parent.append(newDiv);

            return;
        }

        // loop throw each row and replace new random elements
        for (let i = 1, start = 0; i <= totalRows; i += 1, start += 3) {
            let end = start + 3;
            if (end > totalElements) {
                end = totalElements;
            }

            const elements = items.slice(start, end);

            // Create a new div element
            const newDiv = $('<div></div>');

            // Add a class to the new div
            newDiv.addClass(`et_pb_row et_pb_row_${i + 1} et_pb_gutters2`);

            newDiv.html(elements);

            // Add empty item to the end of the last row
            // Note: If strict comparision breaks this operation, rollback to the non-strict version
            if (i === totalRows && emptyItems.length <= 2) {
                newDiv.append(emptyItems);
            }

            parent.append(newDiv);
        }
    };
})(jQuery);
