import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signos } from '../_model/signos';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignosService extends GenericService<Signos>{// heredar del Generico

  private signosCambios= new Subject<Signos[]>(); //para verificar siempre el cambio, variable reactiva
  private mensajeCambio= new Subject<string>(); //para verificar cambio de mensaje, variable reactiva

 
  constructor(protected http: HttpClient) { 

    //invocando al constructor padre de GenericService
      super(
        http,
        `${environment.HOST}/signos`
      );
  }

/*
  listar(){
    return this.http.get<Signos[]>(`${this.url}`);

      
  }

  listarPorId(id: number){
    return this.http.get<Signos>(`${this.url}/${id}`);
  }


registrar(signos: Signos){

  return this.http.post(this.url, signos);
}
modificar(signos: Signos){

  return this.http.put(this.url, signos);
}

eliminar(id: number){
  return this.http.delete<Signos>(`${this.url}/${id}`);
}

//**get set de subject */


getSignosCambio(){
  return this.signosCambios.asObservable();
}

setSignosCambio(signos: Signos[]){

  this.signosCambios.next(signos);
}
getMensajeCambio(){
  return this.mensajeCambio.asObservable();
}
setMensajeCambio(mensaje:string){
  this.mensajeCambio.next(mensaje);
}
}
