import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
const jwt = require("jsonwebtoken");
const express = require("express");

const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        let tokenMissingError: any = new Error(
            "Va rugam introduceti datele de indentificare!"
        );
        tokenMissingError.status = 406;

        return next(tokenMissingError);
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, decoded: any) => {
        if (err) {
            switch (err.constructor) {
                case TokenExpiredError:
                    err.status = 400;
                    err.message =
                        "Din motive de securitate ati fost deconectat, va rugam authentificativa din nou.";
                    break;
                case JsonWebTokenError:
                    err.status = 406;
                    err.message =
                        "Acces restrictionat, va rugam introduceti datele de logare din nou.";
                    break;
                default:
                    err.status = 403;
                    err.message =
                        "Accesul in aceasta sectiune este restrictionat pentru acest cont.";
            }
            return next(err);
        }

        req.userId = decoded.userId;
        req.email = decoded.email;
        return next();
    });
};
const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;
