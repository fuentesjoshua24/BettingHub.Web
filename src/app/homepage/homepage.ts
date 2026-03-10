import { Component, ViewChild } from '@angular/core';
import { ApiService, User } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

//MatPaginatorModule, MatTableModule


@Component({
  selector: 'app-homepage',
  imports: [CommonModule,
            MatTableModule,
            MatPaginatorModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {
  users: User[] = [];
  constructor(private apiService: ApiService) {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
      this.dataSource.data = this.users;
    });
  }
  
  
}
