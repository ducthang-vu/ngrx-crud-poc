import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Book } from '@ngrx-crud-poc/core-data';

@Component({
  selector: 'ngrx-crud-poc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() selected: Book;

  @Output() formSubmit = new EventEmitter<Omit<Book, 'id'>>()

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.selected?.title || '', Validators.required],
      author: [this.selected?.author || '', [Validators.required, Validators.minLength(5)]],
      country: [this.selected?.country || '', [Validators.required, Validators.minLength(5)]],
      language: [this.selected?.language || '', [Validators.required, Validators.minLength(5)]],
      link: [this.selected?.link || '', [Validators.required, Validators.minLength(15)]],
      pages: [this.selected?.pages || '', [Validators.required]],
      year: [this.selected?.year || '', [Validators.required, Validators.min(-2000), Validators.max((new Date).getFullYear())]]
    });
  }

}
