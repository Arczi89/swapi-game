import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin, switchMap } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatProgressBar ],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent implements OnInit {
  items: any[] = [];
  winnerIndex: number | null = null;
  counter =  [0, 0]

  readonly PLAY = 'PLAY';
  readonly PLAY_AGAIN = 'PLAY AGAIN'

  playButtonLabel = this.PLAY;
  opponent1: any;
  opponent2: any;
  attribute = "";

  constructor(
    private router: Router,
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    this.attribute = this.swapiService.getAttribute();
    this.loadItems();
  }

  combat() {
    const value1 = Number(this.opponent1.properties[this.attribute]);
    const value2 = Number(this.opponent2.properties[this.attribute]);
    this.winnerIndex = value1 > value2 ? 0 : 1;
    this.counter[this.winnerIndex]++;
  }

  play() {
    if (this.playButtonLabel == this.PLAY) {
      this.combat();
      this.playButtonLabel = this.PLAY_AGAIN;
    } else {
      this.resetBattle()
    }
  }

  private resetBattle() {
    this.opponent1 = null;
    this.opponent2 = null;
    this.winnerIndex = null;
    this.loadItems();
    this.playButtonLabel = this.PLAY;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  private loadItems() {
    if (this.swapiService.isCategorySet()) {
      this.swapiService.getItems().pipe(
        switchMap(response => {
          this.items = response.results;
          const [index1, index2] = this.drawOpponentsIndices();
          return forkJoin([
            this.swapiService.getItem(this.items[index1].uid),
            this.swapiService.getItem(this.items[index2].uid)
          ])
        })
      ).subscribe(opponents => {
        this.opponent1 = opponents[0].result;
        this.opponent2 = opponents[1].result;
      });
    }
  }

  private drawOpponentsIndices(): number[] {
    const index1 = Math.floor(Math.random() * this.items.length);
    let index2 = Math.floor(Math.random() * this.items.length);
    while(index1 == index2) {
      index2 = Math.floor(Math.random() * this.items.length);
    }
    return [index1, index2];
  }

  propertiesOf(item: any) {
    return Object.entries(item.properties);
  }

  ratio() {
    const sum = this.counter[0] + this.counter[1];
    return sum != 0 ? (this.counter[0] / sum) * 100 : 50;
  }
}
