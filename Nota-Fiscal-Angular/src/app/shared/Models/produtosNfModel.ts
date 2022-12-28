import {ProdutoModel} from "./produtoModel";
import {NotaFiscalModel} from "./notaFiscalModel";

export class ProdutosNfModel {

  id!: number;
  produto!: ProdutoModel;
  notaFiscal!: NotaFiscalModel;
  quantidade!: number;

  public constructor(init?: Partial<ProdutosNfModel>) {
    Object.assign(this, init);
  }

}

