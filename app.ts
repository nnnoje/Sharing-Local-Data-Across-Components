//Villanueva, Martin Conrad S.
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from './employee';
import { Products } from './products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-share-data');

  public employees: {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
  }[] = [];

  public products: {
    id: string,
    name: string,
    description: string,
    price: number,
  }[] = [];

  constructor(
    private _employeeService: Employee,
    private _productsService: Products
  ) {}

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.products = this._productsService.getProducts();
  }
}
