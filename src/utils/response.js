export function success(statusCode, res, data, message = "Success") {
    return res.status(statusCode).json({
        status: true,
        message,
        data,
    });
}
export function error(statusCode, res, message = "Error", errors) {
    return res.status(statusCode).json({
        status: false,
        message,
        errors,
    });
}
