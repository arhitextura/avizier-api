import { IndexLunar } from "./IndexLunar";

export class INDEXLUNAR {
    /**
     *
     */
    constructor() {}
}

export class TabelIndex {
    ListaIndexLunar: Array<IndexLunar> = [];
    constructor(RowData: Array<Object>) {
        RowData.forEach((element: any) => {
            if (
                element.id_index == null ||
                element.id_consumator == null ||
                element.index_citit == null ||
                element.data_citire_index == null ||
                element.tip_consum == null
            )
                throw new Error("Null reference error");
            const indexLunar: IndexLunar = {
                id_consumator: element.id_consumator,
                id_index: element.id_index,
                data_citire_index: element.data_citire_index,
                index_citit: parseInt(element.index_citit),
            };
            this.ListaIndexLunar.push(element);
        });
    }
    AddIndex(index: IndexLunar) {
        this.ListaIndexLunar.push(index);
    }
    GetTabelRestante() {}
}
