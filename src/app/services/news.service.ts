// src/app/servicios/news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { environment }  from '../../environments/environment';
import { Observable }   from 'rxjs';
import { map }          from 'rxjs/operators';

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
}

interface NewsResponse { 
  articles: Article[];
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private apiKey       = environment.newsApiKey;
  private everythingUrl = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) {}

  /** Noticias de Fútbol */
  getFutbolNews(): Observable<Article[]> {
    const url = `${this.everythingUrl}`
      + `?q=Champions%20League%20OR%20Premier%20League%20OR%20La%20Liga%20OR%20Serie%20A%20OR%20Bundesliga%20OR%20Europa%20League`
      + `&language=es`
      + `&sortBy=publishedAt`
      + `&pageSize=9`
      + `&apiKey=${this.apiKey}`;
    return this.http.get<NewsResponse>(url).pipe(map(res => res.articles));
  }

  /** Noticias de Fórmula 1 */
  getF1News(): Observable<Article[]> {
    const url = `${this.everythingUrl}`
      + `?q=formula%201`
      + `&language=es`
      + `&sortBy=publishedAt`
      + `&pageSize=9`
      + `&apiKey=${this.apiKey}`;
    return this.http.get<NewsResponse>(url).pipe(map(res => res.articles));
  }

  /** Noticias NBA */
  getNbaNews(): Observable<Article[]> {
    const url = `${this.everythingUrl}`
      + `?q=NBA`
      + `&language=es`
      + `&sortBy=publishedAt`
      + `&pageSize=9`
      + `&apiKey=${this.apiKey}`;
    return this.http.get<NewsResponse>(url).pipe(map(res => res.articles));
  }  
  
}
