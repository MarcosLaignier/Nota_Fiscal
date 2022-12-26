import {ClienteModel} from "./clienteModel";

export class NotaFiscalModel {


  id!: number
  numeroNf!: String | null;
  serieNf!: String | null;
  dataEmissao!: Date|String;
  cliente!: ClienteModel
  valorTotal!: Number

  public constructor(init?: Partial<NotaFiscalModel>) {
    Object.assign(this, init);
  }

}
