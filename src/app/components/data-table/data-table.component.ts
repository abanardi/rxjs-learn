import { Component, OnInit } from '@angular/core';
import {
  Observable,
  of,
  map,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
  switchAll,
  mergeAll,
  concatAll,
  delay,
  from,
  debounceTime,
  tap,
  BehaviorSubject,
  forkJoin,
  combineLatest,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { differenceInSeconds } from 'date-fns';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  data: any[] = [];
  startDate = new Date();

  clickSubject = new BehaviorSubject(0);
  switchMapClickSubjectObservable$ = this.clickSubject
    .asObservable()
    .pipe(switchMap((val) => of(val).pipe(delay(val * 1000))));

  switchMapEventListSubject = new BehaviorSubject([]);
  switchMapClickSubjectObservableEventList$ = combineLatest({
    one: this.switchMapClickSubjectObservable$,
    two: this.switchMapEventListSubject,
  }).pipe(
    map((val) => {
      const now = new Date();
      const time = differenceInSeconds(now, this.startDate);
      const array: any[] = val.two;
      array.push({ value: val.one, time: time });
      return array;
    })
  );

  concatMapClickSubjectObservable$ = this.clickSubject
    .asObservable()
    .pipe(concatMap((val) => of(val).pipe(delay(val * 1000))));

  concatMapEventListSubject = new BehaviorSubject([]);
  concatMapClickSubjectObservableEventList$ = combineLatest({
    one: this.concatMapClickSubjectObservable$,
    two: this.concatMapEventListSubject,
  }).pipe(
    map((val) => {
      const now = new Date();
      const time = differenceInSeconds(now, this.startDate);
      const array: any[] = val.two;
      array.push({ value: val.one, time: time });
      return array;
    })
  );

  mergeMapClickSubjectObservable$ = this.clickSubject
    .asObservable()
    .pipe(mergeMap((val) => of(val).pipe(delay(val * 1000))));

  mergeMapEventListSubject = new BehaviorSubject([]);
  mergeMapClickSubjectObservableEventList$ = combineLatest({
    one: this.mergeMapClickSubjectObservable$,
    two: this.mergeMapEventListSubject,
  }).pipe(
    map((val) => {
      const now = new Date();
      const time = differenceInSeconds(now, this.startDate);
      const array: any[] = val.two;
      array.push({ value: val.one, time: time });
      return array;
    })
  );

  exhaustMapClickSubjectObservable$ = this.clickSubject
    .asObservable()
    .pipe(exhaustMap((val) => of(val).pipe(delay(val * 1000))));

  exhaustMapEventListSubject = new BehaviorSubject([]);
  exhaustMapClickSubjectObservableEventList$ = combineLatest({
    one: this.exhaustMapClickSubjectObservable$,
    two: this.exhaustMapEventListSubject,
  }).pipe(
    map((val) => {
      const now = new Date();
      const time = differenceInSeconds(now, this.startDate);
      const array: any[] = val.two;
      array.push({ value: val.one, time: time });
      return array;
    })
  );

  noDelayClickSubjectObservable$ = this.clickSubject
    .asObservable()
    .pipe(switchMap((val) => of(val)));

  noDelayEventListSubject = new BehaviorSubject([]);
  noDelayClickSubjectObservableEventList$ = combineLatest({
    one: this.noDelayClickSubjectObservable$,
    two: this.noDelayEventListSubject,
  }).pipe(
    map((val) => {
      const now = new Date();
      const time = differenceInSeconds(now, this.startDate);
      const array: any[] = val.two;
      array.push({ value: val.one, time: time });
      return array;
    })
  );

  ngOnInit(): void {}

  oneSecondDelaySwitchMapClick() {
    this.clickSubject.next(1);
  }

  fiveSecondDelaySwitchMapClick() {
    this.clickSubject.next(5);
  }

  tenSecondDelaySwitchMapClick() {
    this.clickSubject.next(10);
  }

  // Using switchMap
  /* If I click 10, 5, 1, then it will only show 1*/

  // Using mergeMap
  /* If I click 10, 5, 1, it will show 1 5 10 */

  // Using concatMap
  /* If I click 10, 5, 1 it will show 10 5 1*/
}
