import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, Article } from '../../services/news.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  futbolNews: Article[] = [];
  nbaNews: Article[]    = [];
  f1News: Article[]     = [];

  hideAds = false;
  images = ['anuncio1.jpg', 'anuncio2.jpg', 'anuncio3.jpg'];
  image = 0;
  showAll: boolean = false;

  constructor(
    private newsService: NewsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.newsService.getFutbolNews().subscribe(a => this.futbolNews = a);
    this.newsService.getNbaNews().subscribe(a => this.nbaNews = a);
    this.newsService.getF1News().subscribe(a => this.f1News = a);
    this.anuncio();
  }

  private anuncio(): void {
    setInterval(() => {
      this.image = (this.image + 1) % this.images.length;
      this.cdRef.detectChanges();
    }, 5000);
  }

  hideAd(): void {
    this.hideAds = true;
    console.log('Anuncio oculto');
  }
}
