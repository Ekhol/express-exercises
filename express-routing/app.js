const express = require('express');
const app = express();
const ExpressError = require('./expressError')
const {
    validateArr,
    findMean,
    findMedian,
    findMode
} = require('./math');

app.get('/mean', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Invalid query: nums must be numbers separated by comma. ie: 1,2,3,4', 400);
    }

    let numString = req.query.nums.split(',');
    let nums = validateArr(numString);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = { operation: "mean", result: findMean(nums) }

    return res.send(result);
});

app.get('/median', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Invalid query: nums must be numbers separated by comma. ie: 1,2,3,4', 400);
    }

    let numString = req.query.nums.split(',');
    let nums = validateArr(numString);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = { operation: "median", result: findMedian(nums) }

    return res.send(result);
});

app.get('/mode', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Invalid query: nums must be numbers separated by comma. ie: 1,2,3,4', 400);
    }

    let numString = req.query.nums.split(',');
    let nums = validateArr(numString);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = { operation: "mode", result: findMode(nums) }

    return res.send(result);
});

app.get('/all', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Invalid query: nums must be numbers separated by comma. ie: 1,2,3,4', 400);
    }

    let numString = req.query.nums.split(',');
    let nums = validateArr(numString);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "all",
        mean: findMean(nums),
        median: findMedian(nums),
        mode: findMode(nums)
    }

    return res.send(result);
});

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});

app.use(function (err, req, res, next) {
    res.status(res.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});

app.listen(3000, function () {
    console.log(`Server starting on port 3000`);
});