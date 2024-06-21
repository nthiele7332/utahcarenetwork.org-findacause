import '@utils';
import sanitizeInput from '@utils/sanitize';

$(document).ready(() => {
    // onload randomise
    $('div.dfc-realtors div.et_pb_row div.dfc-realtor')
        .randomize();
});

jQuery(($) => {
    $('.et_pb_searchform').on('submit', (event) => {
        // Prevent the default form submission
        event.preventDefault();

        $('#suggestions-box').hide();

        const query = sanitizeInput($('.et_pb_s').val());
        $('div.dfc-realtors div.et_pb_row div.dfc-realtor').filterBy(query);

        // Get the offset of the target element from the top of the page
        const targetOffset = $('form.et_pb_searchform').offset().top;

        // Scroll to the position of the target element with animation
        $('html, body').animate({
            scrollTop: targetOffset,
        }, 1000); // Adjust the duration as needed (in milliseconds)
    });
});

jQuery(document).ready(() => {
    // Clone the original element
    const $clonedElement = $('div.dfc-realtors div.et_pb_row div.dfc-realtor').clone();

    // Create a hidden container and append the cloned element to it
    $('<div id="et_hidden_container" style="display: none!important;"></div>').append($clonedElement).appendTo('body');
});
