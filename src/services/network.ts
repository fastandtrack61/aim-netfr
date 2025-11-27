import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const BACKEND_URL = (window as any).__env?.BACKEND_URL || 'http://localhost:3000';

export interface WanPayload {
  connectionType: 'dhcp' | 'static';
  staticIp?: string;
  gateway?: string;
  dns?: string[]; // array of DNS IP strings
}

export interface LanPayload {
  lanIp: string;      // e.g. 192.168.50.1
  subnet: string;     // e.g. 255.255.255.0
  dhcpEnabled: boolean;
  dhcpStart?: string; // e.g. 192.168.50.100
  dhcpEnd?: string;   // e.g. 192.168.50.200
}

@Injectable({
  providedIn: 'root',
})
export class Network {
  private base = BACKEND_URL;

  constructor(private http: HttpClient) {}

  setWAN(payload: WanPayload): Observable<any> {
    return this.http.post(`${this.base}/api/config/wan`, payload);
  }

  setLAN(payload: LanPayload): Observable<any> {
    return this.http.post(`${this.base}/api/config/lan`, payload);
  }

  getNetworkStatus(): Observable<any> {
    return this.http.get(`${this.base}/api/config/status`);
  }
  
}

// network.service.ts



