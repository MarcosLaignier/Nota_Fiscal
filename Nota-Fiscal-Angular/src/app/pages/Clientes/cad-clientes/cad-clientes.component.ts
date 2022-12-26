import {Component, NgModule, OnInit} from '@angular/core';
import {DxFormModule, DxTextBoxModule, DxToastModule} from "devextreme-angular";
import {ToolbarCadModule} from "../../../shared/components/toolbar/toolbar-cad/toolbar-cad.component";
import {ClienteService} from "../../../shared/services/cliente.service";
import {ClienteModel} from "../../../shared/Models/clienteModel";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DxiItemModule} from "devextreme-angular/ui/nested";
import {ActivatedRoute} from "@angular/router";
import {catchError, empty} from "rxjs";

@Component({
  selector: 'app-cad-clientes',
  templateUrl: './cad-clientes.component.html',
  styleUrls: ['./cad-clientes.component.scss']
})
export class CadClientesComponent implements OnInit {

  constructor(private clienteService: ClienteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getParamRota();
    this.populaDadosCliente();
  }

  // formCadCliente: FormGroup = this.formBuilder.group({
  //   id: [0],
  //   nomeCliente: [''],
  //   cpf: ['']
  // })


  idUrl: number = 0;
  toastVisible: boolean = false;
  type: string = 'info';
  messageToast: string = ' '


  FormCliente:ClienteModel = {
    id:0,
    nomeCliente:null,
    cpf:null
  }

  insertCliente() {
    return this.clienteService.insertClientes(this.FormCliente).pipe(
      catchError(
        err => {
          console.log(err.status);
          if(err.status != null){
            this.toastVisible = true;
            this.type="error"
            if (err.error.message.indexOf('unique')) {
              this.messageToast = `CPF ja cadastrado, Impossivel Nova Inclusão!`
            } else {
              this.messageToast = err.error.message;
            }          }
          return empty()
        })
    ).subscribe(
      response => {
        if (response.status == 201) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Cliente Cadastrado com sucesso'
        }
      }
    );
  }

  populaDadosCliente() {
    if (this.idUrl != 0) {
      return this.clienteService.listClientesByID(this.idUrl).subscribe(
        response => {
          this.FormCliente.id = response.id
          this.FormCliente.nomeCliente = response.nomeCliente
          this.FormCliente.cpf = response.cpf
        }
      )
    } else {
      return null;
    }
  }

  deleteCliente() {


    return this.clienteService.deleteClientes(this.idUrl).subscribe(
      response => {
        if (response.status == 200) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Cliente Excluido com sucesso'
          setTimeout(this.backPage, 1000)
        }
      }
    )
  }

  alteraCliente() {
    return this.clienteService.alterClientes(this.idUrl, this.FormCliente).subscribe(
      response => {
        if (response.status == 200) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Cliente Alterado com sucesso'
        }
      }
    )
  }


  buttonSalvar() {
    console.log(this.idUrl)
    if (this.idUrl == 0 || this.idUrl == undefined) {
      this.insertCliente()
    } else {
      this.alteraCliente()
    }
  }

  getParamRota() {
    this.route.params.subscribe(params => this.idUrl = params['idCliente']);
    console.log(this.idUrl);
  }

  backPage() {
    window.history.back()
  }

}

@NgModule({
  imports: [
    DxFormModule,
    DxiItemModule,
    ToolbarCadModule,
    ReactiveFormsModule,
    DxTextBoxModule,
    DxToastModule


  ],
  declarations: [CadClientesComponent],

})

export class CadClientesModule {
}
