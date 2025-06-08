//Logica de modo oscuro y claro
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private themeClass = 'dark-theme';
  private storageKey = 'user-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  //Al inciar selecciona el tema en base a lo que eligió el usuario
  private initTheme(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      this.enableDark();
    }
  }

  //Comprueba si el modo oscuro está habilitado
  isDark(): boolean {
    return document.body.classList.contains(this.themeClass);
  }

  //Permite al usuario cambiar entre modo oscuro y claro
  toggleTheme(): void {
    if (this.isDark()) {
      this.disableDark();
    } else {
      this.enableDark();
    }
  }

  //Habilita el modo oscuro y guarda la preferencia en localStorage
  private enableDark(): void {
    this.renderer.addClass(document.body, this.themeClass);
    localStorage.setItem(this.storageKey, 'dark');
  }

  //Deshabilita el modo oscuro y guarda la preferencia en localStorage
  private disableDark(): void {
    this.renderer.removeClass(document.body, this.themeClass);
    localStorage.setItem(this.storageKey, 'light');
  }
}
