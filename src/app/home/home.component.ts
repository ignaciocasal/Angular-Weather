import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cities;

  constructor(public fb: FirebaseService) { }

  ngOnInit() {
    this.cities = this.fb.getCities();
  }

}
