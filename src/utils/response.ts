import type {Response} from "express";

export function success<T>(statusCode: number, res: Response, data: T, message: string = "Success") {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}

export function error<T>(statusCode: number, res: Response, message: string = "Error", errors?: T) {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
}