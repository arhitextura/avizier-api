var express = require("express");
var router = express.Router();
const db = require("./sqlconnection.js");

router.use(express.json());

/**
 *
 * @param {} request The request field from express js req-res-next pair
 * @returns {String} String fot sql connection query string
 */
function SelectQueryStringFrom(req) {
    var selectQueryString = `SELECT id_index, id_consumator, index_citit, data_citire_index, tip_consum FROM index_lunar`;
    var orderBy = ``;
    if (Object.keys(req.query).includes("sort")) {
        orderBy = ` ORDER BY ${req.query["sort"]}`;
        delete req.query["sort"];
    } else {
        orderBy = ` ORDER BY 'data_citire_index'`;
    }
    if (Object.keys(req.query).length > 0) selectQueryString += ` WHERE `;
    Object.keys(req.query).forEach((currentKey) => {
        selectQueryString += `${currentKey} in (${db.escape(
            req.query[currentKey].split(",").map((s) => s.trim())
        )})`;
        if (
            Object.keys(req.query).indexOf(currentKey) !=
            Object.keys(req.query).length - 1
        ) {
            selectQueryString += " AND ";
        }
    });
    selectQueryString += orderBy;
    return selectQueryString;
}

/**
 * Toate indexurile lunare cu parametrii (req.query)
 */
router.get("/index_lunar", (req, res, next) => {
    baseSelectQuery += orderBy;
    //If no query was specified
    if (Object.keys(req.query).length === 0) {
        let getAllQuery = `SELECT id_index, id_consumator, index_citit, data_citire_index, tip_consum FROM index_lunar`;
        db.query(getAllQuery, (err, sqlres) => {
            if (err) res.status(500).send(err.message);
            res.status(200).send(sqlres);
        });
        return;
    } else {
        //Use the baseSelectQuery to return the results
        db.query(SelectQueryStringFrom(req), (err, sqlres) => {
            if (err) res.status(500).send(err.message);
            res.status(200).send(sqlres);
        });
        return;
    }
});

router.get("/index_lunar/:id_consumator", (req, res, next) => {
    let selectAllByUserIdQuery = `SELECT id_index, id_consumator, index_citit, data_citire_index, tip_consum FROM index_lunar WHERE id_consumator = ${db.escape(
        req.params.id_consumator
    )}`;
    db.query(selectAllByUserIdQuery, (err, sqlres) => {
        if (err) res.status(500).send(err.message);
        res.status(200).send(sqlres);
    });
    return;
});

module.exports = router;
