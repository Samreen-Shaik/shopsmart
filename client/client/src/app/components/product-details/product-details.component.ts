import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public product: any; // TODO: Define a proper interface for 'product' (e.g., Product interface)
  public isLoading = false;
  private apiUrl = 'http://localhost:5100'; // Centralized API base URL

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuthentication();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProductDetails(productId);
      } else {
        this.handleError('No product ID found in route parameters');
        this.isLoading = false;
      }
    });
  }

  private fetchProductDetails(productId: string): void {
    this.http.get(`${this.apiUrl}/products/${productId}`)
      .pipe(
        catchError(error => {
          this.handleError('Failed to fetch product details');
          return of(null);
        })
      )
      .subscribe(product => {
        if (product) {
          this.product = product;
        }
        this.isLoading = false;
      });
  }

  private checkAuthentication(): void {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('You need to log in to access this page!');
      this.router.navigate(['/login']).then(() => {
        console.log('Navigated to login page');
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    }
  }

  onAddToCart(productId: string): void {
    if (!productId) {
      this.handleError('Invalid product ID');
      return;
    }

    this.http.post(`${this.apiUrl}/add-to-cart`, { productId })
      .pipe(
        catchError(error => {
          this.handleError('Failed to add product to cart');
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Cart update response:', response);
          alert('Product added to cart successfully!');
        }
      });
  }

  private handleError(message: string): void {
    console.error(message);
    alert(message + '. Please try again later.');
  }
}