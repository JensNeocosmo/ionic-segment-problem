import { SegmentsPage } from './../segments/segments';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {}

  ionViewWillEnter(){
    // When i open the iab, close it and then push to segments, it is buggy, the segments react very slowly
   this.openInAppBrowser();
   
   // When i just push to the segments page on app start, it's working normally
   //this.pushToSegments();
  }

  openInAppBrowser(){
    const options: InAppBrowserOptions = {
      fullscreen: "yes",
      location: "yes",
      EnableViewPortScale: "yes",
      clearcache: "yes",
      clearsessioncache: "yes",
      hidden: "no",
    };
    let browser = this.iab.create('https://ionicframework.com/','_blank', options);

    browser.on("loadstop").subscribe(() => {
      browser.executeScript({ code: "console.log('This is just an example script!');"}).then(values => {
        this.navCtrl.push(SegmentsPage).then(() => {
          browser.close();
          browser = undefined;
        });
      })
    });
    browser.on("loaderror").subscribe((error) => {
      console.log(error);
    });
  }

  pushToSegments(){
    this.navCtrl.setRoot(SegmentsPage);
  }

}
