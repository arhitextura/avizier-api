import { Request, Response, NextFunction } from "express";
import { MysqlError } from "mysql";

var crypto = require("crypto");
var express = require("express");
var pool = require("../sql/sqlconnection");
var router = express.Router();
router.use(express.json());
/* post register. */
router.post("/", function (req: Request, res: Response, next: NextFunction) {
    var hashedPassword: string = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
    const createUserString: string = `INSERT INTO utilizatori (email, nume, password)
    VALUES (${pool.escape(req.body.email.toLowerCase())}, 
            ${pool.escape(req.body.nume)}, 
            ${pool.escape(hashedPassword)})`;
    pool.query(createUserString, [], (err: MysqlError, sqlres: any) => {
        if (err) {
            next(new Error(err.sqlMessage));
            return;
        }
        res.status(200).send({
            serverResponse: "Utilizator inregistrat cu succes!",
        });
    });
});

module.exports = router;
