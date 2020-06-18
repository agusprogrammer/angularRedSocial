import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-politica-priv',
  templateUrl: './politica-priv.component.html',
  styleUrls: ['./politica-priv.component.css']
})
export class PoliticaPrivComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volverAtras() {
    this.router.navigate(['home/Network/login']);
  }

}
