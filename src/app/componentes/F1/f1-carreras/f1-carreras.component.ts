import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarF1Component } from '../../../shared/sidebar-f1/sidebar-f1.component';

@Component({
  selector: 'app-f1-carreras',
  imports: [FooterComponent, NavbarComponent, SidebarF1Component],
  templateUrl: './f1-carreras.component.html',
  styleUrl: './f1-carreras.component.scss'
})
export class F1CarrerasComponent {

}
