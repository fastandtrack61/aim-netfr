import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-firewall',
  imports: [CommonModule,FormsModule],
  templateUrl: './firewall.html',
  styleUrl: './firewall.scss',
})
export class Firewall implements OnInit {
 rules: any[] = [];
  backend = (window as any).__env?.BACKEND_URL || "http://localhost:3000";

  newRule: any = {
    srcIp: 'ANY',
    dstIp: 'ANY',
    protocol: 'ANY',
    srcPort: 'ANY',
    dstPort: 'ANY',
    direction: 'BOTH',
    action: 'ALLOW',
    enabled: true,
    aiGenerated: false,
    log: false
  };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    this.http.get(this.backend + "/api/firewall").subscribe((res: any) => {
      this.rules = res.rules;
    });
  }

  addRule() {
    this.http.post(this.backend + "/api/firewall", this.newRule).subscribe(() => {
      alert("Rule added");
      this.load();
    });
  }

  deleteRule(id: number) {
    if (!confirm("Delete this rule?")) return;
    this.http.delete(this.backend + `/api/firewall/${id}`).subscribe(() => {
      this.load();
    });
  }

  generateAI() {
    this.http.post(this.backend + "/api/firewall/ai/generate", {}).subscribe((res: any) => {
      alert("AI rules created");
      this.load();
    });
  }
}


