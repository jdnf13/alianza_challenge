import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from './types/recordTypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class RegistroComponent implements OnInit {
  records: Record[] = [];
  newRecord: Record = {
    name: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: ''
  };
  editedRecord: Record | null = {
    name: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: ''
  };
  isModalOpen = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Record[]>('./assets/registros.json').subscribe(
      (data) => {
        this.records = data;
      },
      (error) => {
        console.log('Error loading registros.json:', error);
      }
    );
  }

  addRecord() {
    if (
      this.newRecord.name &&
      this.newRecord.phone &&
      this.newRecord.email &&
      this.newRecord.startDate &&
      this.newRecord.endDate
    ) {
      this.records.push({ ...this.newRecord });
      this.newRecord = {
        name: '',
        phone: '',
        email: '',
        startDate: '',
        endDate: ''
      };
    }
  }

  deleteRecord(record: Record) {
    const index = this.records.indexOf(record);
    if (index !== -1) {
      this.records.splice(index, 1);
    }
  }  

  openModal(record: Record) {
    this.editedRecord = { ...record };
    this.isModalOpen = true;
  }

  updateRecord() {
    if (this.editedRecord) {
      const index = this.records.findIndex(record => record === this.editedRecord);
      if (index !== -1) {
        this.records[index] = { ...this.editedRecord };
      }
      this.closeModal();
    }
  }
  
  closeModal() {
    this.editedRecord = null;
    this.isModalOpen = false;
  }
  
  
  
}
