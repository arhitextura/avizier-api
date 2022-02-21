import { Request, Response, NextFunction } from "express";
import { MysqlError } from "mysql";

var crypto = require("crypto");
var express = require("express");
var pool = require("../sql/sqlconnection");
var jwt = require("jsonwebtoken");
var router = express.Router();
router.use(express.json());
/* post register. */
router.post(
    "/",
    async function (req: Request, res: Response, next: NextFunction) {
        var hashedPassword: string = crypto
            .createHash("sha256")
            .update(req.body.password)
            .digest("hex");

        if (!req.body.email || !hashedPassword) {
            next(new Error("Nu au fost trimise detaliile de logare."));
            return;
        }
        const AuthWithEmailAndPasswordQuery: string = `SELECT AuthenticateWithEmailAndPassword(
        ${pool.escape(req.body.email.toLowerCase())}, 
        ${pool.escape(hashedPassword)}) AS userid`;
        pool.query(
            AuthWithEmailAndPasswordQuery,
            (err: MysqlError, sqlres: any) => {
                if (err) {
                    next(err.sqlMessage);
                    return;
                }
                let userId = sqlres[0].userid;
                const token = jwt.sign(
                    { userId: userId, email: req.body.email },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: process.env.JWT_DURATION }
                );
                res.status(200).send({
                    serverResponse: "Utilizator autentificat cu succes!",
                    token: token,
                });
            }
        );
    }
);

module.exports = router;
