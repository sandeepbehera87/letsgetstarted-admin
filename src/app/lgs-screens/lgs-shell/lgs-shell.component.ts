import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, Subscription } from 'rxjs';

interface DashboardTab {
  label: string;
  path: string;
  exact: boolean;
  icon: string;
}

@Component({
  standalone: false,
  selector: 'lgs-shell',
  templateUrl: './lgs-shell.component.html',
  styleUrls: ['./lgs-shell.component.css'],
})
export class LgsShellComponent implements OnInit, OnDestroy {
  showTabs = false;
  currentUrl = '';
  private routerSub?: Subscription;

  readonly tabs: DashboardTab[] = [
    { label: 'Questions', path: '/shell/dashboard', exact: true, icon: '☰' },
    { label: 'Add Question', path: '/shell/dashboard/addquestion', exact: false, icon: '＋' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => (event as NavigationEnd).urlAfterRedirects),
        startWith(this.router.url)
      )
      .subscribe((url) => {
        this.currentUrl = url;
        this.showTabs = this.isDashboardArea(url);
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  navClick(path: string): void {
    this.router.navigateByUrl(path);
  }

  isActive(tab: DashboardTab): boolean {
    const current = this.currentUrl.replace(/\/+$/, '');
    const target = tab.path.replace(/\/+$/, '');
    return tab.exact ? current === target : current.startsWith(target);
  }

  private isDashboardArea(url: string): boolean {
    return url.includes('/shell/dashboard');
  }
}