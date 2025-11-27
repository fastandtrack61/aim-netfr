import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Network } from '../services/network';


@Component({
  selector: 'app-wan-lan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wan-lan.html',
  styleUrl: './wan-lan.scss',
})
export class WanLan {

  wanForm: FormGroup;
  lanForm: FormGroup;

  loading = false;
  message: string | null = null;
  error: string | null = null;

  newLanIp: string | null = null;
  redirectCountdown = 10;

  constructor(private fb: FormBuilder, private net: Network) {
    // WAN form
    this.wanForm = this.fb.group({
      connectionType: ['dhcp', Validators.required],
      staticIp: [''],
      gateway: [''],
      dns: [''],
    });

    // LAN form
    this.lanForm = this.fb.group({
      lanIp: ['192.168.50.1', Validators.required],
      subnet: ['255.255.255.0', Validators.required],
      dhcpEnabled: [true],
      dhcpStart: ['192.168.50.100'],
      dhcpEnd: ['192.168.50.200'],
    });
  }

  // ==========================
  // APPLY WAN SETTINGS
  // ==========================
  applyWAN() {
    this.message = this.error = null;

    const f = this.wanForm.value;

    this.loading = true;
    this.net.setWAN({
      connectionType: f.connectionType,
      staticIp: f.staticIp || undefined,
      gateway: f.gateway || undefined,
      dns: f.dns ? f.dns.split(',').map((x: string) => x.trim()) : [],
    }).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'WAN settings applied successfully.';
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to apply WAN settings.';
      }
    });
  }

  // ==========================
  // APPLY LAN SETTINGS
  // ==========================
  applyLAN() {
    this.message = this.error = null;

    const f = this.lanForm.value;

    this.loading = true;
    this.net.setLAN({
      lanIp: f.lanIp,
      subnet: f.subnet,
      dhcpEnabled: f.dhcpEnabled,
      dhcpStart: f.dhcpStart,
      dhcpEnd: f.dhcpEnd,
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = 'LAN settings applied successfully.';

        // If backend gives new LAN IP → redirect
        if (res?.newLanIp) {
          this.newLanIp = res.newLanIp;
          this.startRedirectCountdown();
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to apply LAN settings.';
      }
    });
  }

  // ==========================
  // AUTO REDIRECT AFTER LAN IP CHANGE
  // ==========================
  startRedirectCountdown() {
    this.redirectCountdown = 10;

    const timer = setInterval(() => {
      this.redirectCountdown--;

      if (this.redirectCountdown <= 0) {
        clearInterval(timer);

        if (this.newLanIp) {
          window.location.href = `http://${this.newLanIp}`;
        }
      }
    }, 1000);
  }
}
