import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService} from "ngx-toastr";

const { google } = require('googleapis');
const path = require('path'); 
const fs = require('fs');

const CLIENT_ID = '932897487224-b3pid6a8ddboba6rnvmar3b7jurkr95s.apps.googleusercontent.com';
const CLIENT_SECRET = 'pydCAVG6swif9ckZ1xHIGusZ';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04kSdmTPV7o-0CgYIARAAGAQSNwF-L9IrNGJbo7FwTno3qWrXXmKgkjzApEcQm8-zGjBg_ixthdy4GjK6nXjkfSnh8Iw_ixYjohM';

const  oauth2client = new google.auth.OAuth2(
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
)

oauth2client.setCredentials({refresh_token : REFRESH_TOKEN})

const drive = google.drive({
  version: 'v3',
  auth: oauth2client
})

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.scss']
})
export class FirstpageComponent implements OnInit {

  constructor(public router: Router, private toastr: ToastrService) { }
  

  title = 'OSTEOPOROSIS DETECTION';
  result: string = " ";
  submit = false;

  ngOnInit(): void {
  }

  save(event: any): void {
    var selectFile = event.target.files;
    for (var i = 0; i < selectFile.length; i++) {
      this.result += 'File Name: ' + selectFile[i].name;
      this.result += '<br> File Size (bytes) : ' + selectFile[i].size;
      this.result += '<br> File Type : ' + selectFile[i].type;
      this.result += '<br>------------------------------------- <br>';
     
    }
  }
  uploadFile(event: any){
    var selectFile = event.target.files;   
    for (var i = 0; i < selectFile.length; i++) {
      const filepath = path.join(__dirname, selectFile[i].name);
      try{
        const response = await drive.files.create({
          requestBody: {
            name: selectFile[i].name,
            MimeType: 'image/jpg',
          },
          media: {
            MimeType: 'image/jpg',
            body: fs.createReadStream(filepath),
          },

        }),
      console.log(response.data);
      
      }
      catch(error){
        console.log(error.message);
      }
    }

  }
  public onUpload() {
    this.submit= true; 
    //console.log("UPLOADED SUCCESSFULLY!!");
    this.toastr.show(' STARTED TESTING !!');
    this.uploadFile;
    
  }
}