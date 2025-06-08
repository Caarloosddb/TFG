import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/theme.service';

import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SidebarFutbolComponent } from '../../../shared/sidebar-futbol/sidebar-futbol.component';

@Component({
  selector: 'app-futbol-partidos-dia',
  standalone: true,
  imports: [ CommonModule, NavbarComponent, FooterComponent, SidebarFutbolComponent, FormsModule, RouterModule ],
  templateUrl: './futbol-partidos-dia.component.html',
  styleUrl: './futbol-partidos-dia.component.scss'
})
export class FutbolPartidosDiaComponent {
  partidos: any[] = []; // Lista de partidos de fútbol
  errorMessage: string = '';  // Mensaje de error en caso de que no se encuentren partidos o haya un error en la API
  fechaSeleccionada: string = ''; // Fecha seleccionada por el usuario para filtrar los partidos

  constructor(private http: HttpClient, public themeService: ThemeService) {} 

  ngOnInit(): void {
    const hoy = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    this.fechaSeleccionada = hoy; // Inicializa la fecha seleccionada con la fecha actual
    this.cargarPartidosDelDia();  // Llama a la función para cargar los partidos del día actual
  }

  onFechaCambio() {
    this.cargarPartidosDelDia();  // Llama a la función para cargar los partidos del día con la fecha seleccionada
  }

  cargarPartidosDelDia() {
    // API Key
    const headers = new HttpHeaders({
      'x-apisports-key': '4fd2512f15f791542e09ceb9073e2159'
    });

    const url = `https://v3.football.api-sports.io/fixtures?date=${this.fechaSeleccionada}`;  // Construye la URL para solicitar los partidos del día seleccionado

    console.log('Solicitando partidos del día:', url);  // Muestra en la consola la URL que se está solicitando

    this.http.get<any>(url, { headers }).subscribe({  // Realiza la solicitud GET a la API de fútbol
      next: (data) => { // Maneja la respuesta de la API
        console.log("Datos recibidos:", data);  // Muestra en la consola los datos recibidos de la API

        if (data?.response?.length) {  // Verifica si hay partidos programados para el día seleccionado
          this.partidos = data.response;  // Asigna los partidos recibidos a la lista de partidos
          this.errorMessage = ''; // Limpia el mensaje de error si hay partidos disponibles
        } else {
          this.errorMessage = "No hay partidos programados para hoy.";  // Mensaje de error si no hay partidos programados
          this.partidos = []; // Limpia la lista de partidos si no hay datos
        }
      },
      error: (error) => { // Maneja el error de la API
        console.error('Error al cargar los partidos:', error);  // Muestra un mensaje de error en la consola si la API falla
        this.errorMessage = "Error al cargar los datos."; // Mensaje de error si la API falla
        this.partidos = []; // Limpia la lista de partidos en caso de error
      }
    });
  }
}