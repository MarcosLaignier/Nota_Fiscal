import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProdutoModel} from "../Models/produtoModel";
import {ClienteModel} from "../Models/clienteModel";

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private Httpclient:HttpClient) { }

  private API='http://localhost:8080/servlet/produtos'
  listProdutos(){
    return this.Httpclient.get<ProdutoModel[]>(`${this.API}/list`)
  }

  listById(idProduto:number){
    return this.Httpclient.get<ProdutoModel>(`${this.API}/list/${idProduto}`)
  }

  insertProduto(produto:ProdutoModel){
    return this.Httpclient.post<ProdutoModel>(`${this.API}/insert`,produto,{observe:"response"})  }

  deleteProduto(idProduto:number){
    return this.Httpclient.delete(`${this.API}/delete?idProduto=${idProduto}`,{observe:"response"})
  }

  alterProduto(idProduto:number, produto:ProdutoModel){
    return this.Httpclient.put(`${this.API}/alter/${idProduto}`,produto,{observe:"response"});
  }

  findProdutosCustom(codigoProduto:String,descricaoProduto:String,valorUnit:String){
    let subquery = 'Filter?';
    if (codigoProduto !=''){
      subquery+=`&codigoProduto=${codigoProduto}`
    }
    if (descricaoProduto!=''){
      subquery+=`&descricaoProduto=${descricaoProduto}`
    }
    if (valorUnit!=''){
      subquery+=`&valorUnit=${valorUnit}`
    }

    return this.Httpclient.get<ProdutoModel[]>(`${this.API}/${subquery}`)
  }
}
