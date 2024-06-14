import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { MyCustomRendererComponent } from '../my-custom-renderer/my-custom-renderer.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  rowData: any=[];
  @Input() Data: any
  columnDefs: ColDef[] = [
    { headerName: 'UserId', field: 'userId', flex: 3 },
    { headerName: 'Name', field: 'username', flex :3 },
    { headerName: 'Email', field: 'email', flex : 3 },
    { headerName: 'Address', field: 'addresses', flex: 3 },
    {
      headerName: 'Action',
      field: 'action',
      flex: 3,
      cellRenderer: MyCustomRendererComponent, 
      cellRendererParams: {
        onClick: this.onBtnClick.bind(this),
        label: 'Delete' 
      }
    },
  ];
  onBtnClick(e: any) {
    alert('Deleting user: ' + JSON.stringify(e.rowData));
    let newData = JSON.parse(localStorage.getItem('userdata') as string);
    newData.forEach((element:any,index:number) => {
      if(element.userId == e.rowData.userId){
        console.log(element.userId)
        console.log(e.rowData.userId)
        console.log(index);
        newData.splice(index,1)
      }
    });
    localStorage.setItem('userdata', JSON.stringify(newData));
    this.Data = JSON.parse(localStorage.getItem('userdata') as any);
  }


  defaultCols: ColDef = {
    filter : "agTextColumnFilter",
    floatingFilter : true
  }
  pagination: boolean=true;
  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      userId: ['',  Validators.compose([Validators.required,Validators.pattern(/^\d{4}$/)])],
      username: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)])],
      email: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])],
      addresses: this.formBuilder.array([this.createAddress()])
    })
  }
  ngOnInit(): void {
    console.log(this.Data);
    // this.loadUserData();
    // console.log("Data", this.Data);
  }
  // loadUserData() {
  //   console.log("Data",this.Data);
  //   this.rowData=this.Data
  // }
  get addressList(): FormArray {
    return this.userForm.get('addresses') as FormArray
  }
  createAddress() {
    return this.formBuilder.group({
      street: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipCode: ['', Validators.compose([Validators.required])]
    });
  }
  @Output() newAddDataEvent = new EventEmitter<string>();
  submitForm() {
    if (this.userForm.valid) {
      // console.log("userform",this.userForm);
      // console.log(this.userForm.value);
      this.newAddDataEvent.emit(this.userForm.value);
      this.userForm.reset();
    } else {
      alert("Error in filling the form!!")
    }
  }
  @Output() onAddAddress=new EventEmitter<string>();
  addAddressMssg:string="Address Feild added"
  addAddress() {
    this.addressList.push(this.createAddress());
    this.onAddAddress.emit(this.addAddressMssg)
  }
  @Output() onRemoveAddressEvent=new EventEmitter<string>();
  removeAddressMssg:string="Address Feild removed"
  removeAddress(i: number) {
    this.addressList.removeAt(i);
    this.onRemoveAddressEvent.emit(this.removeAddressMssg)
  }
 
}
