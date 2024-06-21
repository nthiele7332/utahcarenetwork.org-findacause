(function ($) {
    $.fn.randomize = function (rowClass = 'div.dfc-realtors div.et_pb_row') {
        // Extract items from the DOM
        const items = [];
        const emptyItems = [];

        // Loop throw each item and clone it
        $(this).each((index, elem) => {
            const clone = $(elem).clone();

            // Remove last child class, so we can add it later after sorting the list
            clone.removeClass('et-last-child');

            // check if item is empty block
            if (clone.hasClass('et_pb_column_empty')) {
                emptyItems.push(clone);
            } else {
                items.push(clone);
            }
        });

        // Sort each items in random order
        items.sort(() => (Math.round(Math.random()) - 0.5));

        // Add et-last-child class to each 3rd element
        $.each(items, (index, elem) => {
            // Note: If strict comparision breaks this operation, rollback to the non-strict version
            if ((index + 1) % 3 === 0) {
                elem.addClass('et-last-child');
            }
        });

        const totalItems = items.length;
        const totalRows = Math.ceil(totalItems / 3);

        // loop throw each row and replace new random elements
        for (let i = 1, start = 0; i <= totalRows; i += 1, start += 3) {
            const row = $(`${rowClass}:nth-child(${i})`);

            let end = start + 3;
            if (end > totalItems) {
                end = totalItems;
            }

            const elements = items.slice(start, end);
            row.html(elements);

            // Note: If strict comparision breaks this operation, rollback to the non-strict version
            if (i === totalRows && emptyItems.length <= 2) {
                // Add empty items to the end of the last row
                row.append(emptyItems);
            }
        }
    };
})(jQuery);
