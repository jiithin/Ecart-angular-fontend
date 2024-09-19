import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../servics/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm=this.fb.group({

    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

 constructor (private fb:FormBuilder,private api:ApiService,private router:Router){}

 login(){
  if(this.loginForm.valid){
    const email=this.loginForm.value.email
    const password=this.loginForm.value.password
    const user={email,password}
    this.api.loginAPI(user).subscribe({
      next:(res:any)=>{
        alert(`Welcome ${res.existingUser.username}`)
        sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
        sessionStorage.setItem("token",res.token)
        this.api.getWishlistCount() //to get wishlist count at user login 
        this.api.getCartCount() //to get cart count at user login 
        this.loginForm.reset()
        this.router.navigateByUrl("")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }else{
    alert("Invalid Form")
  }
 }
}
