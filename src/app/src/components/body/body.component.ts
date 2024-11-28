import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  observable$ = new Observable<number>((subscriber) => {
    setTimeout(() => {
      subscriber.next(Math.random());
    }, 1000);

    setTimeout(() => {
      subscriber.next(Math.random());
    }, 2000);

    setTimeout(() => {
      subscriber.next(Math.random());
    }, 3000);

    setTimeout(() => {
      subscriber.next(Math.random());
    }, 4000);

    setTimeout(() => {
      subscriber.next(Math.random());
      subscriber.complete();
    }, 5000);
  });

  // recurring$ = new Observable<number>(function subscribe(subscriber) {
  //   const id = setInterval(() => {
  //     subscriber.next(Math.random());
  //     console.log('Wtf');
  //     console.log('Do');
  //   }, 1000);
  // });

  ngOnInit(): void {
    console.log('before subscribe');

    // this.observable$.subscribe({
    //   next(x) {
    //     console.log('printing value');
    //     console.log(x);
    //   },
    // });

    // this.recurring$.subscribe({
    //   next(x) {
    //     console.log('Recurring');
    //     console.log(x);
    //   },
    // });

    console.log('after subscribe');
  }

  ngOnDestroy(): void {}
}
