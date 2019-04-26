import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Connect-5';
  playerName: string;
  names: string[];
  currentMove: number;
  grid: number[][];
  invalidMove = 'Please enter a value between 1 and 9 inclusive';
  inputInvalid = false;
  message: string;
  myid: number;
  active: boolean = false;
  gameOver: boolean = false;


  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gameService.messages.subscribe(message => {

      console.log(message)
      switch (message.type) {
        case 'new-game':
          this.myid = message.playerNumber;
          this.grid = message.board;
          this.gameService.sendMessage({ operation: 'whos-turn' });
          break;
        case 'update-board':
          this.grid = message.board;
          this.gameService.sendMessage({ operation: 'check-win' });
          this.gameService.sendMessage({ operation: 'whos-turn' });
          break;
        case 'activePlayers':
          this.names = message.names;
        case 'game-full':
          this.message = message.message;
        case 'whos-turn':
          if (message.message === this.myid) {
            this.active = true;
          } else {
            this.active = false;
          }
      }
      if (message.type === 'game-over' && message.result === true) {
        this.message = (message.name + ' wins!');
        this.active = false;
        this.gameOver = message.result;
      }
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  login() {
    this.gameService.sendMessage({ operation: 'new-game', message: this.playerName });
  }

  submitMove() {
    if (this.currentMove < 10 && this.currentMove > 0) {
      this.inputInvalid = false;
      this.gameService.sendMessage({ operation: 'make-move', move: this.currentMove - 1, player: this.myid });
    } else {
      this.inputInvalid = true;
    }
  }
}
