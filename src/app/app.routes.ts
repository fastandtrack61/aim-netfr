import { Routes } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';
import { WanLan } from '../wan-lan/wan-lan';
import { Dhcp } from '../dhcp/dhcp';
import { Firewall } from '../firewall/firewall';
import { Devices } from '../devices/devices';
import { Ai } from '../ai/ai';
import { Alerts } from '../alerts/alerts';
import { System } from '../system/system';

export const routes: Routes = [
    {
        path:'',
        component:Dashboard
    },
      {
        path:'dashboard',
        component:Dashboard
    },
    {
        path:'wan-lan',
        component:WanLan
    },
    {
        path:'dhcp',
        component:Dhcp
    },
    {
        path:'firewall',
        component:Firewall
    },
    {
        path:'devices',
        component:Devices
    },
    {
        path:'ai',
        component:Ai
    },
    {
        path:'alerts',
        component:Alerts
    },
    {
        path:'system',
        component:System
    },
];
