import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent {
  data: any[] = [];

  dataTableObservable$ = new Observable<any[]>((subscriber) => {
    subscriber.next([1, 2, 3, 4, 5]);
  });

  getData() {
    console.log('Clicked get data');
    this.dataTableObservable$.subscribe((val: any[]) => {
      console.log('HIT');
      this.data.push(val);
    });
  }
}
