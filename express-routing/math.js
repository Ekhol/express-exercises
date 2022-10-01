function validateArr(numString) {
    let res = [];

    for (let i = 0; i < numString.length; i++) {
        let converted = Number(numString[i]);

        if (Number.isNaN(converted)) {
            return new Error(
                `'${numString[i]}' is not a number.`
            );
        }
        res.push(converted);
    }
    return res;
}

function counter(arr) {
    return arr.reduce(function (accum, next) {
        accum[next] = (accum[next] || 0) + 1;
        return accum;
    }, {});
}

function findMean(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce(function (accum, current) {
        return accum + current;
    }) / arr.length;
}

function findMode(arr) {
    let frequency = counter(arr);
    let count = 0;
    let mostFreq;

    for (let key in frequency) {
        if (frequency[key] > count) {
            mostFreq = key;
            count = frequency[key];
        }
    }

    return +mostFreq;
}


function findMedian(arr) {
    arr.sort((a, b) => a - b);
    let midIdx = Math.floor(arr.length / 2);
    let median;

    if (arr.length % 2 === 0) {
        median = (arr[midIdx] + arr[midIdx - 1]) / 2;
    }
    else {
        median = arr[midIdx];
    }
    return median;
}

module.exports = {
    counter,
    validateArr,
    findMean,
    findMedian,
    findMode
};