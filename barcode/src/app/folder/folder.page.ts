import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public barcode: string;

  constructor(private activatedRoute: ActivatedRoute, private barcodeScanner: BarcodeScanner, public http: HttpClient) { }

  ngOnInit() {
    this.barcode = this.activatedRoute.snapshot.paramMap.get('id');
  }

  scanner(){
    this.barcodeScanner.scan().then(barcodeData => {
         //console.log('Barcode data', barcodeData);
          this.barcode = barcodeData.text;
        
     }).catch(err => {
         //console.log('Error', err);
         alert('Error'+err)
     });
  }
  insertData(){
    let url ='http://localhost:5000/api';
    let data = new FormData();
   let callback:Observable<any> = this.http.post(url,data);
   callback.subscribe(call=>{
     if(!data){
       alert(call.msg);
     }
     else{
       
     }
    
  });


}
}
