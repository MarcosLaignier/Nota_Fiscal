import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Gestao de Notas Fiscais';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
