import { Component,OnInit } from '@angular/core';
import { ApiService } from '../servics/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
  product:any={}

  constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit():void{
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id}=res
      this.getAproduct(id)
      
    })
      
  }

  
  getAproduct(pid:any){
    this.api.viewProductAPI(pid).subscribe((res:any)=>{
        this.product=res
        console.log(res);
    })
  }


  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      //proceed to wishlist
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          alert(`product ' ${res.title}' added to wislist`)
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
