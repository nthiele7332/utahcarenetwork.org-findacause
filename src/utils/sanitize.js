// Replace potentially harmful characters or tags with safe characters
const sanitizeInput = (input) => $('<div/>').text(input).html();

export default sanitizeInput;
