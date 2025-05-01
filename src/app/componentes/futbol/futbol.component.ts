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
  imports: [RouterModule, NavbarComponent, FooterComponent, CommonModule, FormsModule, SidebarComponent],
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

  selectedTemporada!: number;
  selectedJornada!: number;

  errorMessage: string = '';


  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    this.temporadas = [2021, 2022, 2023];
    this.jornadas = Array.from({ length: 38 }, (_, i) => i + 1);

    this.route.params.subscribe(params => {
      this.endpoint = params['endpoint'];
      this.leagueId = +params['leagueId'];
      this.season = +params['season'];
      this.round = +params['round'];

      this.selectedTemporada = this.season;

      this.cargarPartidos();
    });
  }

  irJornadaAnterior() {
    if (this.round > 1) {
      this.round--;
      this.actualizarRuta();
    }
  }
  
  irJornadaSiguiente() {
    if (this.round < 38) {
      this.round++;
      this.actualizarRuta();
    }
  }
  
  onFiltroCambio() {
    this.season = this.selectedTemporada;
    this.round = this.selectedJornada;
    this.actualizarRuta();
  }

  actualizarRuta() {
    this.router.navigate(['/futbol', this.endpoint, this.leagueId, this.season, this.round]);
  }

  cargarPartidos() {
    const headers = new HttpHeaders({
      'x-apisports-key': '56025bbd56166f8696e74b9786336369'
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
