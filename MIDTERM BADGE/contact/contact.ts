import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  showPreview = false;

  onSubmit(): void {
    this.showPreview = true;
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      message: ''
    };
    this.showPreview = false;
  }
}
