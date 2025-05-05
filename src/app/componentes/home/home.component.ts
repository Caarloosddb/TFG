// src/app/componentes/home/home.component.ts
import { Component, OnInit } from '@angular/core';
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

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getFutbolNews().subscribe(a => this.futbolNews = a);
    this.newsService.getNbaNews()   .subscribe(a => this.nbaNews    = a);
    this.newsService.getF1News()    .subscribe(a => this.f1News     = a);
  }
}
