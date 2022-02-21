import { Request, Response, NextFunction } from "express";
import { Connection, MysqlError, PoolConnection } from "mysql";
import { TabelIndex } from "./objects/TabelIndex";
import { GetRestanteUtilizatorPromise } from "./Promise/usersPromiseFunctions";
var express = require("express");
var router = express.Router();
const pool = require("./sqlconnection.js");

router.use(express.json());

/**
 *  If the params at this link are none it will select all columns
 */
router.get("/users", (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT ${
        pool.escapeId(Object.keys(req.query)) || "*"
    } FROM consumatori`;
    pool.query(queryString, (err: MysqlError, sqlres: any) => {
        if (err) res.status(500).send(err.message);
        res.status(200).send(sqlres);
    });
});

router.get(
    "/:user_id/restante",
    (req: Request, res: Response, next: NextFunction) => {
        GetRestanteUtilizatorPromise(req.params.user_id)
            .then((userByIdResults) => {
                res.send(userByIdResults);
            })
            .catch((promiseErr) => {
                next(promiseErr);
            });
    }
);

module.exports = router;
