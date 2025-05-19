import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarF1Component } from '../../../shared/sidebar-f1/sidebar-f1.component';

@Component({
  selector: 'app-f1-clasificacion',
  imports: [NavbarComponent, FooterComponent, SidebarF1Component],
  templateUrl: './f1-clasificacion.component.html',
  styleUrl: './f1-clasificacion.component.scss'
})
export class F1ClasificacionComponent {

}
