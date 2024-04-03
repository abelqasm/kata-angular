import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../cart/service/cart.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    AsyncPipe,
    CurrencyPipe,
    MatButtonModule,
  ],
  template: `
    <form
      class="flex flex-col"
      [formGroup]="shippingDetails"
      (submit)="onSubmit($event)"
    >
      <mat-form-field>
        <mat-label>Fist Name</mat-label>
        <input
          matInput
          placeholder="First name.."
          formControlName="firstName"
        />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput placeholder="Last name.." formControlName="lastName" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Street address</mat-label>
        <input
          matInput
          placeholder="street address.."
          formControlName="streetAddress"
        />
      </mat-form-field>

      <mat-form-field>
        <mat-label>City</mat-label>
        <input matInput placeholder="First name.." formControlName="city" />
      </mat-form-field>
      <div class="flex gap-2">
        <mat-form-field>
          <mat-label>Card number</mat-label>
          <input
            matInput
            placeholder="Ex: xxxx xxxx xxxx xxxx"
            formControlName="cardNumber"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>CCV</mat-label>
          <input matInput placeholder="Ex: xxx" formControlName="CCV" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Expiration date</mat-label>
          <input
            matInput
            placeholder="Ex: xx/xx"
            formControlName="expireDate"
          />
        </mat-form-field>
      </div>
      <button
        type="submit"
        mat-button
        class="check-btn w-full py-2 rounded-lg"
        [disabled]="!shippingDetails.valid"
      >
        Validate your Purchase for {{ totalPrice$ | async | currency }}
      </button>
    </form>
  `,
  styles: [
    `
      .check-btn {
        background-color: #51829b;
      }
    `,
  ],
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService);
  public totalPrice$!: Observable<number>;

  shippingDetails = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
    ]),
    CCV: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
    expireDate: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d\d\/\d\d/i),
    ]),
  });

  ngOnInit() {
    this.totalPrice$ = this.cartService.getTotalPrice();
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    alert('your Order was validated');
  }
}
