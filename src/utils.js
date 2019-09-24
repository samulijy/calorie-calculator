export function round(value, maxDecimals) {
    const number = Number(value);
    if (number % 1 && maxDecimals !== 0) {
        return Number(number.toFixed(1));
    } else {
        return Number(number.toFixed());
    }
}