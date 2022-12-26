import {Component, NgModule, OnInit} from '@angular/core';
import {DxDataGridModule, DxFormModule, DxTextBoxModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {ToolbarListModule} from "../../../shared/components/toolbar/toolbar-list/toolbar-list.component";
import {ClienteService} from "../../../shared/services/cliente.service";
import {ClienteModel} from "../../../shared/Models/clienteModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.scss']
})
export class ListClientesComponent implements OnInit {

  listaClientes: ClienteModel[] = []


  constructor(private clienteService: ClienteService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  listClientes() {
    return this.clienteService.listClientes().subscribe(
      response => {
        this.listaClientes = response
        console.log(this.listaClientes)
      }
    )
  }


  getSelectGrid(select: any) {
    this.router.navigate([`/altcliente/${select}`])

  }

  goToCadastro() {
    this.router.navigate(['/cadcliente'])
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxFormModule,
    DxTextBoxModule,
    DxDataGridModule,
    ToolbarListModule
  ],
  declarations: [ListClientesComponent],

})

export class ListClientesModule {
}



