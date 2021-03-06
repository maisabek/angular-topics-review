import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  schoolForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.schoolForm = this.createFormItem('init');
  }
  /*========== Get Class Rooms ==========*/
  getClassRooms(): FormArray {
    return this.schoolForm.get('classRooms') as FormArray;
  }
  /*========== Add Class Rooms ==========*/
  addClassRoom() {
    this.getClassRooms().push(this.createFormItem('classRoom'));
  }
  /*========== Delete Class Rooms ==========*/
  deleteClassRoom(classRoomIndex: number) {
    this.getClassRooms().removeAt(classRoomIndex);
  }
  /*======== Get Class Room Subjects ========*/
  getClassRoomSubjects(classRoomIndex: number): FormArray {
    return this.getClassRooms()
      .at(classRoomIndex)
      .get('subjects') as FormArray;
  }
  /*======== Add Class Room Subjects ========*/
  addClassRoomSubjects(classRoomIndex: number) {
    this.getClassRoomSubjects(classRoomIndex).push(
      this.createFormItem('subject')
    );
  }
  /*===== Delete Class Room Subjects =====*/
  deleteClassRoomSubjects(classRoomIndex: number, subjectIndex: number) {
    this.getClassRoomSubjects(classRoomIndex).removeAt(subjectIndex);
  }
  /**
   * @param itemType for making a dynamic form : it can be init | classRoom | subject
   * @returns FormGroup
   */
  //FormArray is an alternative to FormGroup for managing 
  //any number of unnamed controls
  //Manages the value and validity state of a numerically 
  //indexed array of AbstractControl instances.
  createFormItem(itemType: string): FormGroup{
    let formItem = this.fb.group({});
    switch (itemType){
      case 'init':
        formItem = this.fb.group({
          schoolName: '',
          totalStudentsCount: '',
          classRooms: this.fb.array([])
        });
        break;
      case 'classRoom':
        formItem = this.fb.group({
          studentsCount: '',
          classRoomNumber: '',
          subjects: this.fb.array([])
        });
        break;
      case 'subject':
        formItem = this.fb.group({
          subjectName: '',
          studentsCount: ''
        });
        break;
    }
    return formItem;
  }
}
