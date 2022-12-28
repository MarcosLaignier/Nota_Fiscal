import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {DxButtonModule} from "devextreme-angular/ui/button";
import DevExpress from "devextreme";
import ClickEvent = DevExpress.ui.dxButton.ClickEvent;
import {DxFormModule} from "devextreme-angular";

@Component({
  selector: 'app-toolbar-cad',
  templateUrl: './toolbar-cad.component.html',
  styleUrls: ['./toolbar-cad.component.scss']
})
export class ToolbarCadComponent implements OnInit {

  @Output() salvarFecharButton = new EventEmitter();
  @Output() salvarButton = new EventEmitter();
  @Output() deleteButton = new EventEmitter();

  @Input() titlePage:String='';
  @Input() group:string=''
  constructor() {
  }

  ngOnInit(): void {
  }

  clickSalvarFechar(event: ClickEvent){
    this.salvarFecharButton.emit(event)
  }

  clickSalvar(event: ClickEvent){
    this.salvarButton.emit(event)
  }

  clickDelete(event: ClickEvent){
    this.deleteButton.emit(event)
  }


  backPage(){
    window.history.back()
  }

  buttonOptions: any = {
    text: 'Salvar',
    type: 'outline',
    useSubmitBehavior: true,
    validationGroup: `${this.group}`,
    onClick: (e: ClickEvent) => {
      if (e.validationGroup.validate().isValid) {
        console.log(this.group)
        console.log(e.validationGroup.validate())
        this.salvarButton.emit(e)
      }
    }
  };

}

@NgModule({
  imports: [
    DxButtonModule,
    DxFormModule
  ],
  declarations: [ToolbarCadComponent],

  exports: [
    ToolbarCadComponent
  ]
})

export class ToolbarCadModule {
}

