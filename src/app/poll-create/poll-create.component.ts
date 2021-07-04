import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PollForm} from '../types';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent {
  pollForm: FormGroup;

  @Output() pollCreated: EventEmitter<PollForm> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.pollForm = this.fb.group({
      question: this.fb.control('', [Validators.required]),
      image: this.fb.control(''),
      opt1: this.fb.control(''),
      opt2: this.fb.control(''),
      opt3: this.fb.control(''),
    });
  }

  submitForm() {
    const formData: PollForm = {
      question: this.pollForm.get('question').value,
      thumbnail: this.pollForm.get('image').value,
      options: [
        this.pollForm.get('opt1').value,
        this.pollForm.get('opt2').value,
        this.pollForm.get('opt3').value
      ]
    };

    this.pollCreated.emit(formData);
  }
}
