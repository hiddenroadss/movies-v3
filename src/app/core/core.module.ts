import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [],
  imports: [HeaderComponent, SideMenuComponent],
  exports: [HeaderComponent, SideMenuComponent]
})
export class CoreModule {}
