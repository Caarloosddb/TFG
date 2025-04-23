import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-futbol',
  imports: [RouterLink, RouterModule, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './futbol.component.html',
  styleUrls: ['./futbol.component.scss']
})
export class FutbolComponent implements OnInit {
  partidos: any[] = [];
  errorMessage: string = '';
  leagueId = 140;
  season = 2022;
  round = 38;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPartidos();
  }

  cargarPartidos() {
    const headers = new HttpHeaders({
      'x-apisports-key': 'c15ecf5ee71dce47f5a76bceca179853'  // Reemplaza con tu clave válida
    });

    // Codificamos el valor del round por si tiene espacios
    const roundText = encodeURIComponent(`Regular Season - ${this.round}`);
    const url = `https://v3.football.api-sports.io/fixtures?league=140&season=2022&round=Regular%20Season%20-%2038`;

    console.log('Requesting URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);

        if (data?.response?.length) {
          this.partidos = data.response;
          this.errorMessage = '';
        } else {
          this.errorMessage = "No hay partidos disponibles";
        }
      },
      error: (error) => {
        console.error('Error en la API:', error);
        this.errorMessage = "Error al cargar los datos";
        this.partidos = [];
      }
    });
  }
}
