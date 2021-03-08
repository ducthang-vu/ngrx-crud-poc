import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ngrx-crud-poc-prompt-select',
  templateUrl: './prompt-select.component.html',
  styleUrls: ['./prompt-select.component.scss']
})
export class PromptSelectComponent {
  @Output() create = new EventEmitter();
}
