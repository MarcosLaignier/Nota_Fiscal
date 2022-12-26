import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DxFormModule, DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";
import {ListClientesComponent} from "../../../../pages/Clientes/list-clientes/list-clientes.component";
import {DxButtonModule} from "devextreme-angular/ui/button";
import DevExpress from "devextreme";
import ClickEvent = DevExpress.ui.dxButton.ClickEvent;

@Component({
  selector: 'app-toolbar-list',
  templateUrl: './toolbar-list.component.html',
  styleUrls: ['./toolbar-list.component.scss']
})
export class ToolbarListComponent implements OnInit {

  @Output() filterButton = new EventEmitter();
  @Output() novoButton = new EventEmitter();
  @Input() titlePage:String='';
  constructor() {
  }

  ngOnInit(): void {
  }

  clickFilter(event: ClickEvent){
    this.filterButton.emit(event)
  }

  clickNovo(event: ClickEvent){
    this.novoButton.emit(event)
  }

  backPage(){
    window.history.back()
  }

}

@NgModule({
  imports: [
    DxButtonModule
  ],
  declarations: [ToolbarListComponent],

  exports: [
    ToolbarListComponent
  ]
})

export class ToolbarListModule {
}
