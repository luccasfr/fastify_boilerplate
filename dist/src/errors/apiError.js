"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        switch (statusCode) {
            case 400:
                this.statusMessage = 'Bad Request';
                break;
            case 401:
                this.statusMessage = 'Unauthorized';
                break;
            case 403:
                this.statusMessage = 'Forbidden';
                break;
            case 404:
                this.statusMessage = 'Not Found';
                break;
            case 500:
                this.statusMessage = 'Internal Server Error';
                break;
            default:
                this.statusMessage = 'Internal Server Error';
                break;
        }
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map