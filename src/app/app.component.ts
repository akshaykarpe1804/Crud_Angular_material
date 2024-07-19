import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Student {
  name: string;
  gender: string;
  course: string;
  enrollmentType: string;
  isScholarship: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  studentForm: FormGroup;
  students: Student[] = [];
  displayedColumns: string[] = ['name', 'gender', 'course', 'enrollmentType', 'isScholarship', 'actions'];
  dataSource = this.students;
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [''],
      gender: [''],
      course: [''],
      enrollmentType: [''],
      isScholarship: [false]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (this.editIndex !== null) {
        // Update existing record
        this.students[this.editIndex] = this.studentForm.value;
        this.editIndex = null;
      } else {
        // Add new record
        this.students.push(this.studentForm.value);
      }
      this.dataSource = [...this.students];
      this.studentForm.reset();
    }
  }

  editStudent(student: Student) {
    this.editIndex = this.students.indexOf(student);
    this.studentForm.setValue(student);
  }

  deleteStudent(student: Student) {
    this.students = this.students.filter(s => s !== student);
    this.dataSource = [...this.students];
  }
}
