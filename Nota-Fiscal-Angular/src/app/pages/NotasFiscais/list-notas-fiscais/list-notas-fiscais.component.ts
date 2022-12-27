import {Component, NgModule, OnInit} from '@angular/core';
import {ProdutosService} from "../../../shared/services/produtos.service";
import {Router} from "@angular/router";
import {ProdutoModel} from "../../../shared/Models/produtoModel";
import {BrowserModule} from "@angular/platform-browser";
import {DxDataGridModule, DxFormModule, DxTextBoxModule} from "devextreme-angular";
import {ToolbarListModule} from "../../../shared/components/toolbar/toolbar-list/toolbar-list.component";
import {NotaFiscalService} from "../../../shared/services/nota-fiscal.service";
import {NotaFiscalModel} from "../../../shared/Models/notaFiscalModel";

@Component({
  selector: 'app-list-notas-fiscais',
  templateUrl: './list-notas-fiscais.component.html',
  styleUrls: ['./list-notas-fiscais.component.scss']
})
export class ListNotasFiscaisComponent implements OnInit {

  constructor(private notaService:NotaFiscalService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  listaNotas:NotaFiscalModel[]=[]
  numeroNf:string='';
  serieNf: string='';
  valorTotal:string='';
  nomeCliente:string='';

  listProdutos() {
    return this.notaService.listNotas().subscribe(
      response =>{
        this.listaNotas=response;

      }
    )
  }

  filterCustom(){
    return this.notaService.filterCustom(this.numeroNf,this.serieNf,this.valorTotal,this.nomeCliente).subscribe(
      response =>{
        this.listaNotas=response
      }
    )
  }

  getSelectGrid(select: any) {
    this.router.navigate([`/altnota/${select}`])

  }

  goToCadastro() {
    this.router.navigate(['/cadnota'])
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxFormModule,
    DxTextBoxModule,
    ToolbarListModule,
    DxDataGridModule
  ],
  declarations: [ListNotasFiscaisComponent],

})

export class ListNotasFiscaisModule {
}
