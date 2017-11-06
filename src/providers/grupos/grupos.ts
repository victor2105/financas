import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Grupo } from '../../models/grupo';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the GruposProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GruposProvider {

  grupos: Grupo[];
  
  constructor(private dbProvider: DatabaseProvider) {
  }

  getGrupos(){
    if(!this.grupos){
      this.grupos = new Array<Grupo>();
    }
    return this.grupos;
  }

  addGrupo(grupos: Grupo[]){
    let grupo: Grupo;
    grupo = new Grupo();
    grupo.nome = "Novo grupo";
    grupo.celulas = [];
    grupos.push(grupo);
    return grupos;
  }
  
  public saveUpdate(g: Grupo){
    if(g.id != 0){
      this.update(g);
    }else{
      this.insert(g);
    }
  }

  public insert(g: Grupo) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into grupos (nome, valor, funcao) values (?, ?, ?)';
        let data = [g.nome, g.valor, g.funcao];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(g: Grupo) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update grupos set nome = ?, valor=?, funcao=? where id = ?';
        let data = [g.nome, g.valor, g.funcao, g.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from grupos where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from grupos where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let g = new Grupo();
              g.id = item.id;
              g.nome = item.nome;
              g.valor = item.valor;
              g.funcao = item.funcao;
 
              return g;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(active: boolean, name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT e.* FROM grupos p where e.ativo = ?';
        var data: any[] = [active ? 1 : 0];
 
        // filtrando pelo nome
        if (name) {
          sql += ' and p.nome like ?'
          data.push('%' + name + '%');
        }
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let esquemas: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var esquema = data.rows.item(i);
                esquemas.push(esquema);
              }
              return esquemas;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
