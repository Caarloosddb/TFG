import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';

@Component({
  selector: 'app-futbol-partido-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule,NavbarComponent, FooterComponent, SidebarFutbolComponent],
  templateUrl: './futbol-partido-detalle.component.html',
  styleUrl: './futbol-partido-detalle.component.scss'
})
export class FutbolPartidoDetalleComponent implements OnInit{

    matchId!: number;

    matchInfo: any;

    errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) { }

    ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchId = +params['matchId'];

    console.log('Params:', this.matchId);
    this.cargarPartido();
    });
  }

  cargarPartido(){
  const headers = new HttpHeaders({
    'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
  });
  const url = `https://v3.football.api-sports.io/fixtures?id=${this.matchId}`;

  this.http.get<any>(url, { headers }).subscribe({
    next: (data) => {
      console.log("Datos del partido:", data);
      const response = data?.response?.[0];
      this.matchInfo = response || null;
    },
    error: (error) => {
      console.error('Error en la API:', error);
      this.errorMessage = "Error al cargar la información del partido";
    }
  });
  }

  goBack(): void {
    this.location.back();
  }
}
