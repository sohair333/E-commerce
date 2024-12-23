import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  constructor() { }
  navItemsDashboard = [
    {
      displayName: 'Dashboard',
      route: '',
      iconName: 'dashboard',
    },
    {
      displayName: 'Customers',
      route: '',
      iconName: 'perm_identity',
      children: [
        {
          displayName: 'Properties List',
          route: '/dashboard/properties',
          iconName: 'noise_control_off',
        },
        {
          displayName: 'Property Manager',
          route: '/dashboard/property-manager',
          iconName: 'noise_control_off',

        },
        {
          displayName: 'Property types',
          route: '/dashboard/property-types',
          iconName: 'noise_control_off',
        },
        {
          displayName: 'Group Of Properties',
          route: '/dashboard/group-of-properties',
          iconName: 'noise_control_off',
        },
      ],
    },
  ]
}

