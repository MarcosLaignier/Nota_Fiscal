import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './shared/services';
import {HomeComponent} from './pages/home/home.component';
import {DxDataGridModule, DxFormModule} from 'devextreme-angular';
import {ListClientesComponent} from "./pages/Clientes/list-clientes/list-clientes.component";
import {CadClientesComponent} from "./pages/Clientes/cad-clientes/cad-clientes.component";
import {ListProdutosComponent} from "./pages/Produtos/list-produtos/list-produtos.component";
import {CadProdutosComponent} from "./pages/Produtos/cad-produtos/cad-produtos.component";
import {ListNotasFiscaisComponent} from "./pages/NotasFiscais/list-notas-fiscais/list-notas-fiscais.component";
import {CadNotasFiscaisComponent} from "./pages/NotasFiscais/cad-notas-fiscais/cad-notas-fiscais.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'clientes',
    component: ListClientesComponent
  },
  {
    path:'cadcliente',
    component:CadClientesComponent
  },
  {
    path:'altcliente/:idCliente',
    component:CadClientesComponent
  }, {
    path: 'produtos',
    component: ListProdutosComponent
  },
  {
    path:'cadproduto',
    component:CadProdutosComponent
  },
  {
    path:'altproduto/:idProduto',
    component:CadProdutosComponent
  },{
    path: 'notafiscal',
    component: ListNotasFiscaisComponent
  },
  {
    path:'cadnota',
    component:CadNotasFiscaisComponent
  },
  {
    path:'altnota/:idNota',
    component:CadNotasFiscaisComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
  ]
})
export class AppRoutingModule {
}
