import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Network } from '../services/network';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   loading = true;
  error: string | null = null;
  dashboard: any = null;

  constructor(private net: Network) {}

  ngOnInit(): void {
    this.fetch();
    // optional: poll every 15s for live dashboard
    // setInterval(() => this.fetch(), 15000);
  }

  fetch() {
    this.loading = true;
    this.error = null;
    // this endpoint is /api/dashboard (see backend)
    this.netBaseGet('/api/dashboard').subscribe({
      next: (res: any) => {
        this.dashboard = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Failed to load dashboard';
        this.loading = false;
      }
    });
  }

  // small helper - use NetworkService base or Http directly if you have a dashboard service
  netBaseGet(path: string) {
    // NetworkService currently has getNetworkStatus, setBASE? We'll make direct Http call using NetworkService pattern
    // But to keep standalone, fallback to using fetch:
    return {
      subscribe: (observer: any) => {
        fetch((window as any).__env?.BACKEND_URL || 'http://localhost:3000' + path)
          .then(r => r.json())
          .then(data => observer.next(data))
          .catch(e => observer.error(e));
      }
    };
  }

  humanBytes(b: number) {
    if (!b && b !== 0) return '-';
    const gb = 1024 * 1024 * 1024;
    const mb = 1024 * 1024;
    if (b >= gb) return (b / gb).toFixed(2) + ' GB';
    if (b >= mb) return (b / mb).toFixed(2) + ' MB';
    return (b / 1024).toFixed(2) + ' KB';
  }

}
