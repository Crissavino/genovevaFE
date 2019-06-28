import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    const header: any = document.querySelector(".header_area");
    const footer: any = document.querySelector(".footer_area");
    header.classList.add("d-none");
    footer.classList.add("d-none");

    setTimeout(() => {
      this.router.navigateByUrl('/home').then(() => {
        location.reload();
      });
    }, 1500);
  }

}
