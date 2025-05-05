// src/app/componentes/home/home.component.ts
import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NewsService, Article } from '../../services/news.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterLink, NavbarComponent, FooterComponent ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  futbolNews: Article[]  = [];
  nbaNews: Article[]     = [];
  f1News: Article[]      = [];
  hideAds: boolean = false; // Control de visibilidad de los anuncios
  images = ['anuncio1.jpg', 'anuncio2.jpg', 'anuncio3.jpg'];  // Lista de imágenes
  currentImageIndex = 0;



  constructor(private newsService: NewsService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.newsService.getFutbolNews().subscribe(a => this.futbolNews = a);
    this.newsService.getNbaNews()   .subscribe(a => this.nbaNews    = a);
    this.newsService.getF1News()    .subscribe(a => this.f1News     = a);
    this.startImageSlider();
  }
  startImageSlider() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000); // Cambiar cada 5 segundos
  }
  
  hideAdPanel(): void {
    console.log("Anuncio oculto"); // Asegúrate de que se llama a esta función
    this.hideAds = true;
  }
}