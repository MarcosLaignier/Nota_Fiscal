import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClienteModel} from "../Models/clienteModel";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient:HttpClient) { }

  private API='http://localhost:8080/servlet/clientes'

  listClientes(){
    return this.httpClient.get<ClienteModel[]>(`${this.API}/list`)
  }
  listClientesByID(idCliente:number){
    return this.httpClient.get<ClienteModel>(`${this.API}/list/${idCliente}`)
  }

  insertClientes(cliente:ClienteModel){
    return this.httpClient.post<ClienteModel>(`${this.API}/insert`,cliente,{observe:"response"})  }

  alterClientes(idCliente:number, cliente:ClienteModel){
    return this.httpClient.put(`${this.API}/alter/${idCliente}`,cliente,{observe:"response"});
  }

  deleteClientes(idCliente:number){
    return this.httpClient.delete(`${this.API}/delete?idCliente=${idCliente}`,{observe:"response"});
  }
}
