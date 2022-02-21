
# Descriere actiuni si rute

## **Actiuni de la utilizatori**  

## Administrator  

* Inregistrare plata  

* Modificare plata  

* Adauga index  


## Consumator - Utilizator  

* Verifica sold  

* Adauga index cu poza  

* Trimite cerere de modificare index  

## **Routes - express routes** - *upgrade to swagger*  

## Utilizatori  

### <span style="color:#F50">/_:user_id_/sold</span>

* $SOLD  = (\Sigma restante + \Sigma regularizari) - \Sigma plati$  
  * Se implementeaza in server  

### Cum se calculeaza restantele?  

1. Se preiau toti indecsii de la utilizatorul cautat.
2. Se [calculeaza](#calcul-restanta) in functie de penultimul index plata restanta.

### <span style="color:#F50">/_:user_id_/plati</span>  

* Toate platile utilizatorului, cu total la final.
  * Adauga plata
  * Modifica plata
  * Sterge plata

### <span style="color:#F50">/_:user_id_/index</span>  

* Toate indexurile citite ale utilizatorului, cu sume de plata.
  * Adauga index
  * Modifica index
  * Sterge index

```json  
{
    "indexuri":    
    [
        {
            "id_index":1001,
            "index": 299,
            "data_citire": "08-12-2021",
            "tip_consum": "APA",
            "de_plata_index_anterior" : 224.35
        },
        {

        }
    ],
    "id_consumator":"cvdKoQlH",
    "numar_intrari": 5,

}
    
```  

## Calcul restanta  

### Get all indexes from user  

Returns:

```javascript  
Returns: Array
[
  {
    id_index: number,
    id_consumator: string(8),
    data_citire_index: string,
    index_citit: number,
    tip_consum:string(default:"APA", "CHELTUIELI", "CURENT", "GAZ")
  }, ... ,{}
]


Restante = {
  data_restantei = data_citire_index[current],
  sold = index_citit[current+1] - index_citit[current] - suma_regularizari, 
}
```  

We iterate over the list of indexes and we calculate the price for each difference of indexes.  

Steps:  

1. Take `index[i-1]`, previouse index, and substract it from the current index `index[i]`; 

2. The date of remaining payment is the date of current `index`.  

3. Query database for the price. <br> `SELECT apa, canal, administratie FROM preturi WHERE anul_valabilitatii >= 'data_restantei'`  
**Problema** : Folosim oferte lunare sau periodice ?  
