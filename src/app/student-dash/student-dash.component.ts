import { ApiService } from './shared/service';
import { Component, OnInit } from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { FormBuilder,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentModel } from './student-dash.model';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit {
  formValue!: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentData!: any; 
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      fees:['']
    })
    this.getAllStudents()
  }
  clickAddStudent(){
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }
postStudentDetails(){     //done POST api
  this.studentModelObj.name = this.formValue.value.name;
  this.studentModelObj.email = this.formValue.value.email;
  this.studentModelObj.mobile = this.formValue.value.mobile;
  this.studentModelObj.fees = this.formValue.value.fees;

  this.api.postStudents(this.studentModelObj).subscribe(res=>{
    console.log(res);
    alert("Student Record Inserted")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllStudents();
  },
  err=>{
    alert("Error during Insert")
  })
}

getAllStudents(){     // Get API
  this.api.getStudents().subscribe(res=>{
    this.studentData = res;
  })
}

deleteStudents(stu:any){    // Delete API
  this.api.deleteStudent(stu.id).subscribe(res=>{
    alert("Student Record Deleted")
    this.getAllStudents()
  })
}

onEdit(stu:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.studentModelObj.id = stu.id;
  this.formValue.controls['name'].setValue(stu.name);
  this.formValue.controls['email'].setValue(stu.email);
  this.formValue.controls['mobile'].setValue(stu.mobile);
  this.formValue.controls['fees'].setValue(stu.fees);
}

updateStudentDetails(){
  this.studentModelObj.name = this.formValue.value.name;
  this.studentModelObj.email = this.formValue.value.email;
  this.studentModelObj.mobile = this.formValue.value.mobile;
  this.studentModelObj.fees = this.formValue.value.fees;

  this.api.updateStudent(this.studentModelObj, this.studentModelObj.id).subscribe(res=>{
    alert("Student Record Updated Successfully!");

    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllStudents();        //for instance Update Data
  })
}
}