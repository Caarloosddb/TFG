import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-clasificacion',
  imports: [ CommonModule, NavbarComponent, FooterComponent, SidebarComponent, FormsModule, RouterModule],
  templateUrl: './clasificacion.component.html',
  styleUrl: './clasificacion.component.scss'
})
export class ClasificacionComponent {
  temporadas: number[] = [];
  selectedTemporada!: number;
  clasificacion: any[] = [];

  leagueId!: number;
  season!: number;

  errorMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    this.temporadas = [2021, 2022, 2023];

    this.route.params.subscribe(params => {
      this.leagueId = +params['leagueId'];
      this.season = +params['season'];

      this.selectedTemporada = this.season;

      this.cargarClasificacion();
    });
  }

  onFiltroCambio() {
    this.season = this.selectedTemporada;
    this.actualizarRuta();
  }

  actualizarRuta() {
    this.router.navigate(['/clasificacion', this.leagueId, this.season]);
  }

  cargarClasificacion() {
    const headers = new HttpHeaders({
      'x-apisports-key': '56025bbd56166f8696e74b9786336369'
    });


    const url = `https://v3.football.api-sports.io/standings?league=${this.leagueId}&season=${this.season}`;

    console.log('Requesting URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);

        if (data?.response?.length) {
          this.clasificacion = data.response[0]?.league?.standings?.[0];
          this.errorMessage = '';
        } else {
          this.errorMessage = "No hay partidos disponibles";
        }
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.errorMessage = "Error al cargar los datos";
        this.clasificacion = [];
      }
    });
  }

}