import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['reg', 'speed', 'locstr'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  speed: number;
  reg: number;
  locstr: string;
  getdataValues: any = []
  dataValue = []
  valueData = []
  ELEMENT_DATA = []
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.http.get("assets/data.json").subscribe(data => {
      this.getdataValues = Object.values(data)
      for (var i = 0; i < this.getdataValues.length; i++) {
        this.ELEMENT_DATA.push({ 'speed': this.getdataValues[i][0].speed, 'regNo': this.getdataValues[i][0].regNo, 'locStr': this.getdataValues[i][0].locStr })
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 50);

    }, error => {
      console.log('Error: ', error);
    })
  }
}
