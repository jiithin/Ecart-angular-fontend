import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servics/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any=[]

  constructor(private api:ApiService){}

  ngOnInit():void{
    this.getAllProducts()
    
      
  }

  getAllProducts(){
    this.api.getAllProductsAPI().subscribe({
      next:(res:any)=>{
        this.allProducts=res
        console.log(res);
        
      },error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }



  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      //proceed to wishlist
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          // alert(`product ' ${res.title}' added to wislist`)
          this.api.getWishlistCount()
        },error:(reason:any)=>{
          alert(reason.error)
        }
      })
    }else{
      alert("Please Login")
    }
  }


  addToCart(product:any){
    if(sessionStorage.getItem("token")){
       //proceed to cart
       product.quantity=1
       this.api.addToCartAPI(product).subscribe({
        next:(res:any)=>{
          alert(res)
          this.api.getCartCount()
          },
          error:(reson:any)=>{
          alert(reson.error)
          }
       })
       
    }else{
      alert("Please Login")
    }

  }


}


