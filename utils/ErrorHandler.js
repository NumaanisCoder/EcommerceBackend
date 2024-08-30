module.exports.asyncErrorHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (e) {
            console.error(e);
            next(e); // Pass the error to the next middleware (optional)
        }
    };
};

class ErrorHandler extends Error{
    constructor(status,message){
        super();
        this.status = status;
        this.message = message;
    }
}


module.exports.ErrorHandler = ErrorHandler;
