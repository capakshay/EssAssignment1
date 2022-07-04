import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
// import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ESS_Angular';
  mediaSub!: Subscription;
  deviceXs!: boolean;
  courses!: any[];

  constructor(public mediaObserver: MediaObserver) {
    // console.log(db.list('/courses'));
  }
  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        this.deviceXs = result.mqAlias == 'xs' ? true : false;
      }
    );
  }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}
