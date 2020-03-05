import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage;

  constructor(public fb: FirebaseService, public router: Router) {
  }

  ngOnInit() {
  }

  signup(e) {
    console.log("SIGN UPPPP")
    this.fb.signup(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('');
    }, (err) => {
      console.log(err)
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }
}
