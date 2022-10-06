const express = require("express")
const app = express();
const itemRoutes = require("./routes/items")
const expressError = require("./expressError")

app.use(express.json());
app.use("/items", itemRoutes)

app.use(function (req, res, next) {
    return new expressError("Not Found", 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    });
});

module.exports = app