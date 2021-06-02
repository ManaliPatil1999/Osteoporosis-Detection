import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thirdpage',
  templateUrl: './thirdpage.component.html',
  styleUrls: ['./thirdpage.component.scss']
})
export class ThirdpageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  img1: string = " assets/images/c11.jpg";  
  img: string =" assets/images/st2.png"
  img2: string = "assets/images/binarization.png";
  img3: string = "assets/images/edgedetection.png";
  img4: string = "assets/images/dilation.png";
  img5: string =" assets/images/st4.jpg"

  onView(){
    this.router.navigate(["/secondpage"])
    
  }

}
