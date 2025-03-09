import { Component, OnInit } from '@angular/core';
import {
  Observable,
  of,
  map,
  switchMap,
  mergeMap,
  concatMap,
  switchAll,
  mergeAll,
  concatAll,
  delay,
  from,
  debounceTime,
  tap,
  BehaviorSubject,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
// import { of } from 'rxjs';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  data: any[] = [];

  dataTableObservable$ = new Observable<any[]>((subscriber) => {
    subscriber.next(['Red', 'Green', 'Blue']);
  });

  testSwitchMapObservable$ = new Observable<any>((subscriber) => {
    console.log('Started');
    setTimeout(() => {
      subscriber.next('First registered');
    }, 100);

    // 1000 delta
    setTimeout(() => {
      subscriber.next('Second registered');
    }, 200);

    // 1500 delta
    setTimeout(() => {
      subscriber.next('Third registered');
      subscriber.complete();
    }, 300);
  }).pipe(switchMap((val) => of(val).pipe(delay(120))));

  clickSubject = new BehaviorSubject(0);
  clickSubjectObservable$ = this.clickSubject
    .asObservable()
    .pipe(switchMap((val) => of(val).pipe(delay(val * 1000))))
    .subscribe(console.log);

  ngOnInit(): void {}

  testingObservableClick() {
    this.testSwitchMapObservable$.subscribe(console.log);
  }

  oneSecondDelayClick() {
    this.clickSubject.next(1);
  }

  fiveSecondDelayClick() {
    this.clickSubject.next(5);
  }

  tenSecondDelayClick() {
    this.clickSubject.next(10);
  }

  // Using switchMap
  /* If I click 10, 5, 1, then it will only show 1*/

  // Using mergeMap
  /* If I click 10, 5, 1, it will show 1 5 10 */

  // Using concatMap
  /* If I click 10, 5, 1 it will show 10 5 1*/

  getData() {
    this.dataTableObservable$.subscribe((val: any[]) => {
      if (this.data.length === 0) {
        this.data = val;
      } else {
        this.data = [];
      }
    });
  }
}
