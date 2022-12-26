import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotaFiscalModel} from "../Models/notaFiscalModel";
import {ProdutosNfModel} from "../Models/produtosNfModel";

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {

  constructor(private Httpclient:HttpClient) { }

  private API ='http://localhost:8080/servlet/notaFiscal'

  listNotas(){
    return this.Httpclient.get<NotaFiscalModel[]>(`${this.API}/list`)
  }

  listNotaByID(idNota:Number){
    return this.Httpclient.get<NotaFiscalModel>(`${this.API}/list/${idNota}`)
  }

  listProdutosNf(idNota:Number){
    return this.Httpclient.get<ProdutosNfModel[]>(`${this.API}/listProdutosNf/${idNota}`)
  }

  insertNotas(notaFiscal:NotaFiscalModel){
    return this.Httpclient.post<NotaFiscalModel>(`${this.API}/insert`,notaFiscal,{observe:'response'})
  }

  insertProdutoNota(produtos:ProdutosNfModel){
    return this.Httpclient.post<ProdutosNfModel>(`${this.API}/insertProd`,produtos,{observe:'response'})
  }

  deleteNota(idNota:Number){
    return this.Httpclient.delete<NotaFiscalModel>(`${this.API}/delete?idNota=${idNota}`,{observe:'response'})
  }

  alterNotaFiscal(idNota:Number, notaFiscal:NotaFiscalModel){
    return this.Httpclient.put(`${this.API}/alter/${idNota}`,notaFiscal,{observe:'response'})
  }





}
