import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule ],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.css'
})
export class BattleComponent implements OnInit {
  items: any[] = [];
  winnerIndex: number | null = null;
  playButtonLabel = 'PLAY';
  winner: any;

  constructor(
    private router: Router,
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    if(this.swapiService.isCategorySet()) {
      this.swapiService.getItems().subscribe(response => {
        this.items = response.results;
      });
    }
  }

  combat() {
    return this.items;
  }

  play() {
    this.winner = this.combat();
    this.playButtonLabel = 'PLAY AGAIN';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
