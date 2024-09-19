import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cartCount = new BehaviorSubject(0)
  wishlistCount = new BehaviorSubject(0)
  SERVER_URL="http://localhost:3000"

  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount()
    }
   }

  //get all aproducts api
  getAllProductsAPI(){
    return this.http.get(`${this.SERVER_URL}/allproducts`)
  }

  //register
  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }
  //login
  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }

    //view product
    viewProductAPI(id:any){
      return this.http.get(`${this.SERVER_URL}/view/${id}`)
    }

    //append token header  //manasilayilla 
    appendTokenHeader(){
      const token = sessionStorage.getItem("token")
        let headers = new HttpHeaders()
        if(token){
          headers = headers.append("Authorization",`Bearer ${token}`)
        }
        return {headers}
      
    }


    //add to wishlist 
    addToWishlistAPI(product:any){
      return this.http.post(`${this.SERVER_URL}/addtowishlist`,product,this.appendTokenHeader())
    }

    // get wishlist
    getWishlistAPI(){
      return this.http.get(`${this.SERVER_URL}/getwishlist`,this.appendTokenHeader())
    }

    //get wishlist count
    getWishlistCount(){
     this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
     })
    }

    //remove wishlist
    removeWishlistAPI(id:any){
      return this.http.delete(`${this.SERVER_URL}/remove/${id}`,this.appendTokenHeader())
    }


    //add To Cart
    addToCartAPI(product:any){
      return this.http.post(`${this.SERVER_URL}/addtocart`,product,this.appendTokenHeader())
    }


    //get cart api
    getCartAPI(){
      return this.http.get(`${this.SERVER_URL}/getcart`,this.appendTokenHeader())
    }

    //get cart count
    getCartCount(){
      this.getCartAPI().subscribe((res:any)=>{
        this.cartCount.next(res.length)
      })
    }

    //removecart api
    removeCartAPI(id:any){
        return this.http.delete(`${this.SERVER_URL}/removecart/${id}`,this.appendTokenHeader())
      }

      //increment item
      incrementItemAPI(id:any){
        return this.http.get(`${this.SERVER_URL}/cartincrement/${id}`,this.appendTokenHeader())
      }


      //decrement item
      decrementItemAPI(id:any){
        return this.http.get(`${this.SERVER_URL}/cartdecrement/${id}`,this.appendTokenHeader())
      }

      //empty cart
      emptyCartAPI(){
        return this.http.delete(`${this.SERVER_URL}/emptycart`,this.appendTokenHeader())
      }



    }





