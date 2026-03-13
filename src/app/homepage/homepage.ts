import { Component, ViewChild } from '@angular/core';
import { ApiService, User } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface NavItem {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-homepage',
  imports: [CommonModule,
            MatTableModule,
            MatPaginatorModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})

export class Homepage {
  constructor(private apiService: ApiService) {}


  // Table data
  users: User[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
      this.dataSource.data = this.users;
    });
  }
  


  // Navigation state
  isShrunk = false;

  navItems: NavItem[] = [
    { label: 'Dota', icon: 'assets/icons/dota.png' },
    { label: 'Counter Strike', icon: 'assets/icons/csgo.png' }  
    // { label: 'Home', icon: '🏠' },
    // { label: 'Profile', icon: '👤' },
    // { label: 'Settings', icon: '⚙️' },
    // { label: 'About', icon: 'ℹ️' }
  ];

  selectedItem: NavItem = this.navItems[0];

  toggleNav() {
    this.isShrunk = !this.isShrunk;
  }

  selectItem(item: NavItem) {
    this.selectedItem = item;
  }
  
}
