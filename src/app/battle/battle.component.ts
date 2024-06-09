import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  category: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private swapiService: SwapiService
  ) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category') || '';
    this.loadItems();
  }

  loadItems() {
    const fetchMethod = this.category === 'people' ? this.swapiService.getPeople() : this.swapiService.getSpaceships();

    fetchMethod.subscribe(response => {
      this.items = this.getRandomItems(response.results, 2);
    });
  }

  getRandomItems(array: any[], num: number) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  play() {
    this.winnerIndex = Math.floor(Math.random() * this.items.length);
    this.playButtonLabel = 'PLAY AGAIN';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
