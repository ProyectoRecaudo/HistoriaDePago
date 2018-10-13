import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {

  db: SQLiteObject = null;

  constructor(public sqlite: SQLite) {
    console.log('Hello DatabaseServiceProvider Provider');
  }

  //Crea la base de datos si no existe y abre la conexión
  public openDB() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default' //el campo location es obligatorio
    })
      .then((db: SQLiteObject) => {
        this.db = db;
      })
  }

  //Creación de tablas
  public createTableSitios(){
    return this.db.executeSql("CREATE TABLE NOT EXISTS sitios(id INTEGER PRIMARY KEY AUTOINCREMENT, lat FLOAT, lng FLOAT, address TEXT, description TEXT, foto TEXT)",[])
  }

  //Guardar sitios
  public addSitio(sitio){
    let sql = "INSERT INTO sitios(lat, lng, address, description, foto) VALUES (?,?,?,?,?)";
    return this.db.executeSql(sql,[sitio.lat, sitio.lng, sitio.address, sitio.de, sitio.foto]);
  }

  //Listar sitios
  public getSitios(){
    let sql = "SELECT * FROM sitios";
    return this.db.executeSql(sql,[]);
  }
}
