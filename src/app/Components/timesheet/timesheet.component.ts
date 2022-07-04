import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/Services/notifications.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  constructor(private notifyService: NotificationsService) {}
  ngOnInit(): void {
    // this.notifyService.showSuccess('', `New User Login First`);
  }
  p: number = 1;
  totalTime = 0;
  totalHrs = 0;
  totalMin = 0;
  prevTime = 0;
  updateButton: boolean = false;
  particularObj: any = [];
  moreThan14 = false;
  id = -1;
  allDate: any = [
    {
      '2022-06-09': [
        {
          id: 0,
          name: 'Akshay Nikam',
          project_name: 'Art',
          activity: 'Daily StandUp Meeting',
          date: '2022-06-09',
          time_spent: { hrs: 2, min: 22 },
          description: 'Hey there Today I complete .....',
          display: 'disable',
        },
        {
          id: 1,
          name: 'Akshay Nikam',
          project_name: 'Art',
          activity: 'Daily StandUp Meeting',
          date: '2022-06-09',
          time_spent: { hrs: 1, min: 22 },
          description: 'Hi there Today I complete .....',
          display: 'disable',
        },
      ],
      '2022-06-08': [
        {
          id: 0,
          name: 'Akshay Nikam',
          project_name: 'TeleForg',
          activity: 'Daily StandUp Meeting',
          date: '2022-06-08',
          time_spent: { hrs: 2, min: 22 },
          description: 'Hey there Today I complete .....',
          display: 'disable',
        },
        {
          id: 1,
          name: 'Akshay Nikam',
          project_name: 'TeleForg',
          activity: 'Daily StandUp Meeting',
          date: '2022-06-08',
          time_spent: { hrs: 1, min: 22 },
          description: 'Hi there Today I complete .....',
          display: 'disable',
        },
      ],
    },
  ];

  timesheet = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('Akshay Nikam', Validators.required),
    project_name: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time_spent: new FormGroup({
      hrs: new FormControl('', [
        Validators.required,
        Validators.pattern('^([0-3])$'),
      ]),
      min: new FormControl('', [
        Validators.required,
        Validators.pattern(`^([0-9]|[1-5][0-9])$`),
      ]),
    }),
    description: new FormControl('', Validators.required),
  });

  saveData() {
    let currentDate = this.timesheet.value.date;
    console.log(currentDate);

    if (this.allDate[0].hasOwnProperty(`${currentDate}`)) {
      if (this.timecheck(currentDate)) {
        console.log(this.allDate[0][`${currentDate}`]);
        let id = this.allDate[0][`${currentDate}`].length;
        this.timesheet.value.id = id;
        this.allDate[0][`${currentDate}`].push(this.timesheet.value);
        this.notifyService.showSuccess('', `Submit Succesfully`);
      } else {
        console.log('Inside Else TimeCheck');
      }
    } else {
      this.allDate[0][currentDate] = [];
      this.allDate[0][currentDate].push(this.timesheet.value);
    }
    this.particularObj = -1;
    this.updateButton = false;
    this.timesheet.reset();
    this.timesheet.controls['name'].setValue('Akshay Nikam');
  }

  changeicon(a: any, num: number, icon: number) {
    this.particularObj = a;
    this.particularObj.id = num;
    console.log('Click', a.value[num]?.date);
    this.timecheck(a.key, 'icon');
    if (icon == 1) {
      this.particularObj.id = num;
    }
    if (icon == -1) {
      this.moreThan14 = false;
      this.particularObj = -1;
    }
  }

  editData(data: any) {
    this.timesheet.controls['name'].setValue('Akshay Nikam');
    this.timesheet.controls['project_name'].setValue(data.project_name);
    this.timesheet.controls['activity'].setValue(data.activity);
    this.timesheet.controls['date'].setValue(data.date);
    this.timesheet.get(['time_spent', 'hrs'])?.setValue(data.time_spent.hrs);
    this.timesheet.get(['time_spent', 'min'])?.setValue(data.time_spent.min);
    this.timesheet.controls['description'].setValue(data.description);
    this.timesheet.value.id = data.id;
    this.id = data.id;
    this.updateButton = true;
  }

  update() {
    console.log('Inside Update');
    let currentDate = this.timesheet.value.date;
    if (!this.id) {
      this.id = 0;
    }

    if (this.timecheck(currentDate, 'hi')) {
      this.allDate[0][`${currentDate}`][this.id].project_name =
        this.timesheet.value.project_name;
      this.allDate[0][`${currentDate}`][this.id].activity =
        this.timesheet.value.activity;
      this.allDate[0][`${currentDate}`][this.id].date =
        this.timesheet.value.date;
      this.allDate[0][`${currentDate}`][this.id].time_spent.hrs =
        this.timesheet.value.time_spent.hrs;
      this.allDate[0][`${currentDate}`][this.id].time_spent.min =
        this.timesheet.value.time_spent.min;
      this.allDate[0][`${currentDate}`][this.id].description =
        this.timesheet.value.description;
      this.updateButton = false;
      this.particularObj = -1;
      this.timesheet.reset();
      this.timesheet.controls['name'].setValue('Akshay Nikam');
      this.notifyService.showInfo('', `Update Succesfully`);
    }
  }

  timecheck(date: any, update?: any): boolean {
    let a = this.allDate[0][date];
    this.totalTime = 0;
    this.totalHrs = 0;
    this.totalMin = 0;
    let totalMin22 = 0;
    let time = 0;

    if (update != 'hi') {
      for (let i = 0; i < a.length; i++) {
        //for submit button
        let hmin = a[i].time_spent.hrs * 60;
        let tMin = hmin + a[i].time_spent.min;
        totalMin22 = totalMin22 + tMin;
      }
    } else {
      for (let i = 0; i < a.length; i++) {
        //for update
        if (i != this.id) {
          let hmin = a[i].time_spent.hrs * 60;
          let tMin = hmin + a[i].time_spent.min;
          totalMin22 = totalMin22 + tMin;
        }
      }
    }
    time =
      this.timesheet.value.time_spent.hrs * 60 +
      this.timesheet.value.time_spent.min;
    if (update != 'icon') {
      this.totalTime = totalMin22 + time;
    } else {
      this.totalTime = totalMin22;
    }

    if (this.totalTime > 840) {
      this.totalHrs = ~~(this.prevTime / 60);
      this.totalMin = this.prevTime % 60;
      this.moreThan14 = true;
      this.notifyService.showError('', `Enter Valid Data`);
      return false;
    } else {
      this.totalHrs = ~~(this.totalTime / 60);
      this.totalMin = this.totalTime % 60;
      this.prevTime = this.totalTime;
      this.moreThan14 = false;
      return true;
    }
  }

  get projectName() {
    return this.timesheet.get('project_name');
  }
  get activity() {
    return this.timesheet.get('activity');
  }
  get date() {
    return this.timesheet.get('date');
  }
  get hrs() {
    return this.timesheet.get(['time_spent', 'hrs']);
  }
  get min() {
    return this.timesheet.get(['time_spent', 'min']);
  }
  get description() {
    return this.timesheet.get('description');
  }
}
