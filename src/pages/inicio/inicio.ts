import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

declare var google: any;

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  map: any; //Manejadador del mapa
  coords: any = { lat: 0, lng: 0 };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public modalCtrl: ModalController
  ) {
    platform.ready().then(() => {
      //La plataforma esta lista y tenemos acceso a los plugins
      this.obtenerPosicion();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  obtenerPosicion() {
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;

      this.loadMap();
    })
      .catch(
        (error) => {
          console.log(error.message);
          this.coords.lat = 43.2686812;
          this.coords.lng = -2.9340118000000075;
          //this.loadMap();
        }
      )
  }

  //Se encargara de mostrar un mapa
  loadMap() {
    let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 12
    });

    //Colocamos el marcador
    let miMarker = new google.maps.Marker({
      icon: 'assets/imgs/ico_estoy_aqui.png',
      map: this.map,
      position: this.coords
    });
  }

  nuevoSitio(){
    let mimodal = this.modalCtrl.create('ModalNuevoSitioPage', this.coords);
    mimodal.present();
  }

}
