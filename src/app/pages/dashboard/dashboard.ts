import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SearchPipe } from '../../pipes/search-pipe';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  imports: [UpperCasePipe,DatePipe,CurrencyPipe,SearchPipe,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  ngOnInit(): void {
    this.getProducts()
  }
  name:string="anila"
  today:any=new Date()
  price:number=10000

  products:any = []

  searchKey:string = ""

  private http = inject(HttpClient)

  getProducts(){
    this.http.get('https://dummyjson.com/products').subscribe((res:any)=>{
      console.log(res.products);
      this.products = res.products
    })
  }
}
