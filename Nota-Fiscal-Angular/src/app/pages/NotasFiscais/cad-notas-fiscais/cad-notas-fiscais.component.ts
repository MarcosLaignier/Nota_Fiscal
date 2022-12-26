import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {catchError, empty} from "rxjs";
import {  DxAutocompleteModule, DxDataGridModule,
  DxDateBoxModule,
  DxFormModule, DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxToastModule
} from "devextreme-angular";
import {DxiItemModule, DxoGridModule} from "devextreme-angular/ui/nested";
import {ToolbarCadModule} from "../../../shared/components/toolbar/toolbar-cad/toolbar-cad.component";
import {DxButtonModule} from "devextreme-angular/ui/button";
import {NotaFiscalService} from "../../../shared/services/nota-fiscal.service";
import {ClienteService} from "../../../shared/services/cliente.service";
import {ClienteModel} from "../../../shared/Models/clienteModel";
import {NotaFiscalModel} from "../../../shared/Models/notaFiscalModel";
import {ProdutosNfModel} from "../../../shared/Models/produtosNfModel";
import {ProdutoModel} from "../../../shared/Models/produtoModel";
import {ProdutosService} from "../../../shared/services/produtos.service";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-cad-notas-fiscais',
  templateUrl: './cad-notas-fiscais.component.html',
  styleUrls: ['./cad-notas-fiscais.component.scss']
})
export class CadNotasFiscaisComponent implements OnInit {

  constructor(private notaService: NotaFiscalService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private clienteService:ClienteService,
              private produtoService:ProdutosService) {
  }

  ngOnInit(): void {
    this.getParamRota();
    this.populaDadosNota()
    this.listCliente()
    this.listProduto()
  }
  idUrl: number = 0;
  toastVisible: boolean = false;
  type: string = 'info';
  messageToast: string = ' '

  dadosGeraisVisible:boolean = true
  produtosVisible:boolean = false

  clienteSelecionado:ClienteModel={
    cpf: "", id: 1, nomeCliente: ""

  };

  FormCadNota:NotaFiscalModel ={
    id:0,
    numeroNf:null,
    serieNf:null,
    dataEmissao:new Date().toLocaleDateString(),
    valorTotal:0,
    cliente:this.clienteSelecionado

  }


  FormProdutosNF:ProdutosNfModel[] =[{
    id:0,
    produto:[],
    notaFiscal:new NotaFiscalModel(),
    quantidade:1
  }]
  listaClientes:ClienteModel[]=[]
  listaProdutos:ProdutoModel[]=[]

  insertNota() {
    let notaFiscalInserida = new NotaFiscalModel(this.FormCadNota);

    return this.notaService.insertNotas(notaFiscalInserida).pipe(
      catchError(
        err => {
          console.log(err.status);
          if(err.status != null){
            this.toastVisible = true;
            this.type="error"
            if (err.error.message.indexOf('unique') ){
              this.messageToast=`Numero ja utilizado, Impossivel Nova Inclusão!`
            }else{
              this.messageToast=err.error.message;            }
          }
          return empty()
        })
    ).subscribe(
      response => {
        let NotaFiscal:NotaFiscalModel
          for (let i = 0;i<this.FormProdutosNF.length; i++){
          if(response.body != null) {
            NotaFiscal= response.body

            this.insertProdutosNf(i, NotaFiscal)
          }

        }
        if (response.status == 201) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Nota Fiscal cadastrada com sucesso'
        }
      }
    );
  }
  insertProdutosNf(i:number, notaFiscal:NotaFiscalModel) {

    let prod = new ProdutosNfModel(this.FormProdutosNF[i])
    prod.notaFiscal = notaFiscal
    return this.notaService.insertProdutoNota(prod).subscribe(
      response => {
      }
    )
  }

  populaDadosNota() {
    if (this.idUrl != 0) {
      return this.notaService.listNotaByID(this.idUrl).subscribe(
        response => {
          this.FormCadNota.numeroNf = response.numeroNf
          this.FormCadNota.serieNf = response.serieNf
          this.FormCadNota.dataEmissao = response.dataEmissao
          this.FormCadNota.cliente=response.cliente
          this.FormCadNota.valorTotal=response.valorTotal
          console.log(response.cliente)
          this.populaProdutosNota(this.idUrl)

          }
      )
    } else {
      return null;
    }
  }

  populaProdutosNota(idNota:Number){
    return this.notaService.listProdutosNf(idNota).subscribe(
      response=>{
        this.FormProdutosNF=response
      }
    )
  }

  deleteNota() {
    return this.notaService.deleteNota(this.idUrl).subscribe(
      response => {
        if (response.status == 200) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Nota Fiscal Excluida com sucesso'
          setTimeout(this.backPage, 1000)
        }
      }
    )
  }

  listCliente(){
    return this.clienteService.listClientes().subscribe(
      response=>{
        this.listaClientes=response
      }
    )
  }

  listProduto(){
    return this.produtoService.listProdutos().subscribe(
      response=>{
        this.listaProdutos=response
      }
    )
  }

  listProdutosC = function(data:ProdutoModel){
    return data && data.codigoProduto+ " - " + data.descricaoProduto ;
  }

  alteraNotaFiscal() {
    return this.notaService.alterNotaFiscal(this.idUrl, this.FormCadNota).subscribe(
      response => {
        if (response.status == 200) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Nota Fiscal Alterada com sucesso'


        }
      }
    )
  }

  clickProdutos(){
    this.dadosGeraisVisible = false
    this.produtosVisible = true

  }

  clickDadosGerais(){
    this.dadosGeraisVisible = true
    this.produtosVisible = false

  }

  buttonSalvar() {
    if (this.idUrl == 0 || this.idUrl == undefined) {
      this.insertNota()
    } else {
      this.alteraNotaFiscal()
    }
  }

  getParamRota() {
    this.route.params.subscribe(params => this.idUrl = params['idNota']);
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
    DxToastModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxDateBoxModule,
    BrowserModule,
    DxAutocompleteModule,
    DxDataGridModule,
    DxNumberBoxModule


  ],
  declarations: [CadNotasFiscaisComponent],

})

export class CadNotasFiscaisModule {
}
