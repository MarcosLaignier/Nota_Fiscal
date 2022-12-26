import {Component, NgModule, OnInit} from '@angular/core';
import {DxDataGridModule, DxFormModule, DxTextBoxModule} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {ToolbarListModule} from "../../../shared/components/toolbar/toolbar-list/toolbar-list.component";
import {Router} from "@angular/router";
import {ProdutosService} from "../../../shared/services/produtos.service";
import {ProdutoModel} from "../../../shared/Models/produtoModel";

@Component({
  selector: 'app-list-produtos',
  templateUrl: './list-produtos.component.html',
  styleUrls: ['./list-produtos.component.scss']
})
export class ListProdutosComponent implements OnInit {



  constructor(private produtosService:ProdutosService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  listaProdutos:ProdutoModel[]=[]
  codigoProduto:string=''
  descricaoProduto:string=''
  valorUnit:string=''

  listProdutos() {
    return this.produtosService.listProdutos().subscribe(
      response =>{
        this.listaProdutos=response;

      }
    )
  }

  filterProdutoCustom(){
    return this.produtosService.findProdutosCustom(this.codigoProduto,this.descricaoProduto,this.valorUnit).subscribe(
      response =>{
        this.listaProdutos=response;

      }
    )
  }

  getSelectGrid(select: any) {
    this.router.navigate([`/altproduto/${select}`])

  }

  goToCadastro() {
    this.router.navigate(['/cadproduto'])
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
  declarations: [ListProdutosComponent],

})

export class ListProdutosModule {
}




