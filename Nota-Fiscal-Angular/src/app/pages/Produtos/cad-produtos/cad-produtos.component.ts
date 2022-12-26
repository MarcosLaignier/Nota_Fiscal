import {Component, NgModule, OnInit} from '@angular/core';
import {
  DxAutocompleteModule,
  DxFormModule,
  DxTextBoxModule,
  DxToastModule,
  DxValidatorModule
} from "devextreme-angular";
import {ToolbarCadModule} from "../../../shared/components/toolbar/toolbar-cad/toolbar-cad.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {DxiItemModule} from "devextreme-angular/ui/nested";
import {ActivatedRoute} from "@angular/router";
import {catchError, empty} from "rxjs";
import {ProdutosService} from "../../../shared/services/produtos.service";
import {ProdutoModel} from "../../../shared/Models/produtoModel";

@Component({
  selector: 'app-cad-produtos',
  templateUrl: './cad-produtos.component.html',
  styleUrls: ['./cad-produtos.component.scss']
})
export class CadProdutosComponent implements OnInit {

  constructor(private produtoService: ProdutosService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getParamRota();
    this.populaDadosProduto()
  }

  idUrl: number = 0;
  toastVisible: boolean = false;
  type: string = 'info';
  messageToast: string = ' '

  FormProduto: ProdutoModel = {
    id: 0,
    codigoProduto: null,
    descricaoProduto: '',
    valorUnit: 0
  }

  insertProduto() {

    return this.produtoService.insertProduto(this.FormProduto).pipe(
      catchError(
        err => {
          console.log(err.error.message);
          if (err.status != null) {
            this.toastVisible = true;
            this.type = "error"
            if (err.error.message.includes('constraint')) {
              this.messageToast = `Codigo ja utilizado, Impossivel Nova Inclusão!`
            } else {
              this.messageToast = err.error.message;
            }
          }
          return empty()
        })
    ).subscribe(
      response => {
        if (response.status == 201) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Produto Cadastrado com sucesso'

        }
      }
    );
  }

  populaDadosProduto() {
    if (this.idUrl != 0) {
      return this.produtoService.listById(this.idUrl).subscribe(
        response => {
          this.FormProduto.id = response.id
          this.FormProduto.codigoProduto = response.codigoProduto
          this.FormProduto.descricaoProduto = response.descricaoProduto
          this.FormProduto.valorUnit = response.valorUnit
        }
      )
    } else {
      return null;
    }
  }

  deleteProduto() {


    return this.produtoService.deleteProduto(this.idUrl).subscribe(
      response => {
        if (response.status == 200) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Produto Excluido com sucesso'
          setTimeout(this.backPage, 1000)
        }
      }
    )
  }

  alteraProduto() {
    return this.produtoService.alterProduto(this.idUrl, this.FormProduto).subscribe(
      response => {
        if (response.status == 200) {
          this.toastVisible = true
          this.type = 'success'
          this.messageToast = 'Produto Alterado com sucesso'
        }
      }
    )
  }




  buttonSalvar() {
    if (this.idUrl == 0 || this.idUrl == undefined) {
      this.insertProduto()
    } else {
      this.alteraProduto()
    }
  }

  getParamRota() {
    this.route.params.subscribe(params => this.idUrl = params['idProduto']);
    console.log(this.idUrl);
  }

  backPage() {
    window.history.back()
  }

  onFormSubmit = function (e: any) {

    e.preventDefault();
  }

  buttonOptions: any = {

    text: 'Enviar',
    type: 'success',
    useSubmitBehavior: true,


  };

  customFirstNameValidationCallback(e: any) {

    // simulando o required
    if (!e.value || e.value === '') {
      e.rule.message = "Primeiro nome não pode ser nulo"
      e.rule.isValid = false;

      // força rule inválida (retorno false)
      return false;
    }

    // força rule válida (retorno true)
    return true;
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
    DxAutocompleteModule,
    DxValidatorModule,


  ],
  declarations: [CadProdutosComponent],

})

export class CadProdutosModule {
}
