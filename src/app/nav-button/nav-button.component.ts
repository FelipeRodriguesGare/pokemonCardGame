import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss']
})
export class NavButtonComponent implements OnInit {
  @Input() route:string = ''
  @Input() icon:string = ''
  @Input() name:string = ''
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendTo(url:string) {
    this.router.navigate([url]) 
  }

  checkRoute() {
    if (this.router.url == `/${this.route}`) return true
    return false
  }

}
