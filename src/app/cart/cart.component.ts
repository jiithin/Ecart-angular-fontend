import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servics/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  allProducts:any=[]
  clickCuponStatus:boolean=false
  cuponStatus:boolean=false
  totalPrice:number=0

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getCart()
    
  }

  getCart(){
    this.api.getCartAPI().subscribe({
      next:(res:any)=>{
      this.allProducts=res
      console.log(this.allProducts);
      this.api.getCartCount()
      this.getCartTotal()
      
    
     },error:(reason:any)=>{
      console.log(reason);
     }
   })
  }

  deleteItem(id:any){
    this.api.removeCartAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },error:(reson:any)=>{
        console.log(reson.error);
        
      }
    })
  }

  incrementQuantity(id:any){
    this.api.incrementItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },error:(reson:any)=>{
        console.log(reson.error);
        
      }
    })
  }


  decrementQuantity(id:any){
    this.api.decrementItemAPI(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },error:(reson:any)=>{
        console.log(reson.error);
        
      }
    })
  }

  
  emptyCart(){
    this.api.emptyCartAPI().subscribe({
      next:(res:any)=>{
        this.getCart()
        this.api.getCartCount()
      },error:(reson:any)=>{
        console.log(reson.error);
      }
    })
  }

  getCupon(){
    this.cuponStatus=true
  }

  discount50(){
    this.clickCuponStatus=true
    let discount=Math.round(this.totalPrice*0.5)
    this.totalPrice=this.totalPrice-discount
  }

  discount35(){
    this.clickCuponStatus=true
    let discount=Math.round(this.totalPrice*0.65)
    this.totalPrice=this.totalPrice-discount
  }


  getCartTotal(){
    this.totalPrice=Math.round(this.allProducts.map((product:any)=>product.totalPrice).reduce((p1:any,p2:any)=>p1+p2))
  }
}
