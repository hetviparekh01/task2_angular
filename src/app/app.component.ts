import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task2_angular';
  userdata: any = [];
  additionmssg: string | undefined
  removalmssg: string | undefined;

  ngOnInit(): void {
    if (localStorage.getItem('userdata')) {
      this.userdata = JSON.parse(localStorage.getItem('userdata') as any);
    } else {
      this.userdata = []
    }
  }

  getUserData(newItem: any) {
    this.userdata = [...this.userdata, newItem];
    // console.log("userdata",this.userdata);
    localStorage.setItem('userdata', JSON.stringify(this.userdata));
  }

  addAddressMssg(addmssg: string) {
    this.additionmssg = addmssg
    alert(this.additionmssg)
    console.log(this.additionmssg);
  }

  removeAddressMssg(addmssg: string) {
    this.removalmssg = addmssg
    alert(this.removalmssg)
    console.log(this.removalmssg);
  }
}
