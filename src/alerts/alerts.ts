import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
})
export class Alerts implements OnInit {
  alerts: any[] = [];
  loading = true;
  backend = (window as any).__env?.BACKEND_URL || "http://localhost:3000";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.http.get(this.backend + "/api/alerts").subscribe((res: any) => {
      this.alerts = res.alerts || [];
      this.loading = false;
    });
  }

  clear() {
    if (!confirm("Clear all alerts?")) return;
    this.http.delete(this.backend + "/api/alerts/clear").subscribe(() => {
      this.load();
    });
  }
}
