import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-futbol',
  standalone: true,
  imports: [RouterLink, RouterModule, NavbarComponent, FooterComponent, CommonModule, FormsModule, SidebarComponent],
  templateUrl: './futbol.component.html',
  styleUrls: ['./futbol.component.scss']
})
export class FutbolComponent implements OnInit {
  temporadas: number[] = [];
  jornadas: number[] = [];
  partidos: any[] = [];
  endpoint: string = '';
  leagueId!: number;
  season!: number;
  round!: number;
  errorMessage: string = '';


  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.endpoint = params['endpoint'];
      this.leagueId = +params['leagueId'];
      this.season = +params['season'];
      this.round = +params['round'];

      this.temporadas = [2023, 2022, 2021]; // <-- Solo estos años permitidos
      this.jornadas = Array.from({ length: 38 }, (_, i) => i + 1); // Jornadas del 1 al 38

      this.cargarPartidos();
    });
  }

  actualizarRuta() {
    this.router.navigate(['/futbol', this.endpoint, this.leagueId, this.season, this.round]);
  }

  cargarPartidos() {
    const headers = new HttpHeaders({
      'x-apisports-key': 'c15ecf5ee71dce47f5a76bceca179853'
    });

    const roundText = encodeURIComponent(`Regular Season - ${this.round}`);

    const url1 = `https://v3.football.api-sports.io`;
    const url = `https://v3.football.api-sports.io/${this.endpoint}?league=${this.leagueId}&season=${this.season}&round=${roundText}`;

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
