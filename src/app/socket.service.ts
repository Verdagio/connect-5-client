import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  connect(): Subject<MessageEvent> {
    this.socket = io(environment.url);

    let observable = new Observable(observer => {
      this.socket.on('message', data => {
        observer.next(data);
      })
      return()=>{
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data)=>{
        this.socket.emit(data.operation, JSON.stringify(data));
      }
    }
    return Subject.create(observer, observable);

  }
}
