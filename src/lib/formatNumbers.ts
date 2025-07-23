

export default function formatNumber(num:number) {
    if (num < 1000) {
        return num.toString();
    }
    
    const units = ['k', 'M', 'B', 'T', 'Q']; // Thousand, Million, Billion, Trillion,Quadrillion
    let unitIndex = -1;
    let scaledNum = num;
    
    while (scaledNum >= 1000 && unitIndex < units.length - 1) {
        scaledNum /= 1000;
        unitIndex++;
    }
    
    // For numbers between 1,000-9,999: show as 1k, 2k,...9k without decimal
    if (unitIndex === 0 && scaledNum < 10 && num >= 1000) {
        return Math.floor(scaledNum) + units[unitIndex];
    }
    
    // For numbers where the scaled version is between 1.0-9.9
    if (scaledNum < 10) {
        // Show one decimal place only if it's not .0
        const decimalPart = Math.round((scaledNum % 1) * 10);
        if (decimalPart > 0) {
            return scaledNum.toFixed(1) + units[unitIndex];
        }
        return Math.floor(scaledNum) + units[unitIndex];
    }
    
    // For numbers where scaled version is 10-999
    return Math.floor(scaledNum) + units[unitIndex];
}