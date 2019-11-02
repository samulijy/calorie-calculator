export function round(value, maxDecimals) {
    const number = Number(value);
    if (number % 1 && maxDecimals !== 0) {
        return Number(number.toFixed(1));
    } else {
        return Number(number.toFixed());
    }
}

// Returns a bootstrap style
export function calculateStyle(currentValue, goal) {
    if (currentValue > 0.95 * goal && currentValue < 1.05 * goal) {
        return 'primary';
    } else if (currentValue > 0.85 * goal && currentValue < 1.15 * goal) {
        return 'warning'
    } else {
        return 'danger'
    }
}