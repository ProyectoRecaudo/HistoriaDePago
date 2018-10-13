import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'MisTabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public db:DatabaseServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //Abre la bd
      this.db.openDB()
      .then(() => this.db.createTableSitios())
    });
  }

}

