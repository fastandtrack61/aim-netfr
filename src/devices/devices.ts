import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-devices',
  imports: [CommonModule,FormsModule],
  templateUrl: './devices.html',
  styleUrl: './devices.scss',
})
export class Devices implements OnInit {
loading = true;
  error: string | null = null;
  devices: any[] = [];
  selected: any = null;
  backendBase = (window as any).__env?.BACKEND_URL || 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = null;
    this.http.get(this.backendBase + '/api/devices').subscribe({
      next: (res: any) => {
        this.devices = res.devices || [];
        this.loading = false;
      },
      error: (err:any) => {
        this.error = err?.error?.message || 'Failed to load devices';
        this.loading = false;
      }
    });
  }

  blockDevice(d: any) {
    if (!confirm(`Block ${d.ip || d.mac}?`)) return;
    this.http.post(this.backendBase + '/api/devices/block', { ip: d.ip, mac: d.mac }).subscribe({
      next: () => { alert('Blocked'); this.load(); },
      error: (e) => alert('Block failed: ' + (e?.error?.message || e?.message || e))
    });
  }

  unblockDevice(d: any) {
    if (!confirm(`Unblock ${d.ip || d.mac}?`)) return;
    this.http.post(this.backendBase + '/api/devices/unblock', { ip: d.ip, mac: d.mac }).subscribe({
      next: () => { alert('Unblocked'); this.load(); },
      error: (e) => alert('Unblock failed: ' + (e?.error?.message || e?.message || e))
    });
  }

  vendorOrUnknown(d: any) {
    return d.vendor || 'Unknown';
  }
}


