import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  messages: Subject<any>;

  constructor(private socketService: SocketService) {
    this.messages = <Subject<any>>socketService.connect()
    map((response: any): any => {
      return response;
    })
  }
  sendMessage(message){
    this.messages.next(message);
  }

}



