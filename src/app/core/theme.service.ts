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

  private initTheme(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      this.enableDark();
    }
  }

  isDark(): boolean {
    return document.body.classList.contains(this.themeClass);
  }

  toggleTheme(): void {
    if (this.isDark()) {
      this.disableDark();
    } else {
      this.enableDark();
    }
  }

  private enableDark(): void {
    this.renderer.addClass(document.body, this.themeClass);
    localStorage.setItem(this.storageKey, 'dark');
  }

  private disableDark(): void {
    this.renderer.removeClass(document.body, this.themeClass);
    localStorage.setItem(this.storageKey, 'light');
  }
}
