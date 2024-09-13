import { Parameter } from '../../Entities/parameter';
import { Component } from '@angular/core';
import { ParameterService } from '../../Services/parameter.service';

@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrl: './admin-config.component.css'
})
export class AdminConfigComponent {
  selectedTime: string = '12:00'; // Default value
  email:any;
  percentage:any;
  showButtons: boolean = false;
  parameter!:Parameter;
  prm!: Parameter ; // Update this with the correct fields

  constructor(private parameterService: ParameterService) { }

  ngOnInit(): void {
    this.getParameter();
  }

  // Fetch a parameter by ID
  getParameter(): void {
    this.parameterService.getParameter(1).subscribe(
      (data) => {
        this.parameter = data;
        console.log('Fetched parameter:', this.parameter);
      },
      (error) => {
        console.error('Error fetching parameter:', error);
      }
    );
  }

  // Update a parameter
  updateParameter(): void {

    this.parameterService.updateParameter(1, this.parameter).subscribe(
      (data) => {
        console.log('Updated parameter:', data);
      },
      (error) => {
        console.error('Error updating parameter:', error);
      }
    );
  }

  // Called when any input changes
  onInputChange(): void {
    this.showButtons = true; // Show the buttons when any input changes
  }

  // Save function to handle save logic
  save(): void {
    // Handle save logic here
    console.log('Saving changes...');
    this.showButtons = false; // Hide the buttons after saving
  }

  // Cancel function to reset form or dismiss changes
  cancel(): void {
    // Handle cancel logic here
    console.log('Cancelling changes...');
    this.showButtons = false; // Hide the buttons after cancelling
  }



  isValidEmail(email: string): boolean {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
