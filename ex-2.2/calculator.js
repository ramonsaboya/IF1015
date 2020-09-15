const ERROR_DIVISION_BY_ZERO = 0x0;

const errorMessages = {};
errorMessages[ERROR_DIVISION_BY_ZERO] = "Division by zero";

function evaluate(input) {
    input = input.split(" ");
    const op = input[0];
    const x1 = parseInt(input[1]);
    const x2 = parseInt(input[2]);

    if (op == "/" && x2 == 0) {
        return {
            success: false,
            error: ERROR_DIVISION_BY_ZERO,
        };
    }

    var value;
    if (op == "+") value = x1 + x2;
    if (op == "-") value = x1 - x2;
    if (op == "*") value = x1 * x2;
    if (op == "/") value = x1 / x2;

    return {
        success: true,
        value,
    };
}

module.exports = {
    errorMessages,
    evaluate,
};
