var db = require("../sqlconnection");
var logger = require("morgan");
function IndexLunar(
    id_index,
    id_consumator,
    data_citire,
    index_citit,
    tip_consum = "APA"
) {
    this.id_index = id_index;
    this.id_consumator = id_consumator;
    this.data_citire = data_citire;
    this.index_citit = index_citit;
    this.tip_consum = tip_consum;
}

function TabelIndex() {
    this.colectieIndex = new Array();
    this.colectieRestante = new Array();

    this.AddIndexLunar = function (IndexLunar) {
        this.colectieIndex.push(IndexLunar);
    };

    this.Init = function (_preturi) {
        let _consum = new Object();
        for (let i = 1; i < this.colectieIndex.length; i++) {
            let preturi = _preturi || {
                apa: 4.8287,
                canal: 5.1339,
                administratie: 9.0,
            };
            _consum.data = new Date(this.colectieIndex[i].data_citire);
            _consum.volum =
                this.colectieIndex[i].index_citit -
                this.colectieIndex[i - i].index_citit;
            _consum.pret_apa = _consum.volum * preturi.apa;
            _consum.pret_canalizare = _consum.volum * 0.8 * preturi.canal;
            _consum.pret_administratie = preturi.administratie;
            this.colectieRestante.push(_consum);
            console.log(_consum);
        }
    };
}

//module.exports = { TabelIndex: TabelIndex, IndexLunar: IndexLunar };
