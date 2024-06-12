import { Item } from './../types/item';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin, switchMap } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatProgressBar, MatProgressSpinner ],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent implements OnInit {

  readonly PLAY = 'PLAY';
  readonly PLAY_AGAIN = 'PLAY AGAIN';

  items: Item[] = [];
  winnerIndex: number | null = null;
  counter =  [0, 0];
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

  combat(): void {
    if (this.opponent1 && this.opponent2) {
      const value1 = Number(this.opponent1[this.attribute]);
      const value2 = Number(this.opponent2[this.attribute]);
      this.winnerIndex = value1 > value2 ? 0 : 1;
      this.counter[this.winnerIndex]++;
    }
  }

  play(): void {
    if (this.playButtonLabel == this.PLAY) {
      this.combat();
      this.playButtonLabel = this.PLAY_AGAIN;
    } else {
      this.resetBattle()
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  propertiesOf(item: Item) {
    return Object.entries(item);
  }

  ratio(): number {
    const sum = this.counter[0] + this.counter[1];
    return sum != 0 ? (this.counter[0] / sum) * 100 : 50;
  }

  private resetBattle(): void {
    this.opponent1 = undefined;
    this.opponent2 = undefined;
    this.winnerIndex = null;
    this.loadItems();
    this.playButtonLabel = this.PLAY;
  }

  private loadItems(): void {
    if (this.swapiService.isCategorySet()) {
      this.swapiService.getItems().pipe(
        switchMap(response => {
          this.items = response.results;
          const [index1, index2] = this.drawOpponentsIndices();
          return forkJoin([
            this.swapiService.getItem(this.items[index1].uid),
            this.swapiService.getItem(this.items[index2].uid)
          ]);
        })
      ).subscribe(results => {
        this.opponent1 = results[0].result.properties as Item;
        this.opponent2 = results[1].result.properties as Item;
      });
    }
  }

  private drawOpponentsIndices(): [number, number] {
    if (this.items.length === 0) {
      return [0, 0];
    }
    const index1 = Math.floor(Math.random() * this.items.length);
    let index2 = Math.floor(Math.random() * this.items.length);
    while(index1 == index2) {
      index2 = Math.floor(Math.random() * this.items.length);
    }
    return [index1, index2];
  }
}
