class HttpError extends Error {
    constructor (message, statusCode, description = 'Error') {
        super(description)
       
        Object.setPrototypeOf(this, new.target.prototype)
        this.message = message
        this.statusCode = statusCode
        Error.captureStackTrace(this)
    }
}
       
module.exports = HttpError;
