import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleComponent } from './battle.component';
import { SwapiService } from '../swapi.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('BattleComponent', () => {
  let component: BattleComponent;
  let fixture: ComponentFixture<BattleComponent>;

  const mockSwapiService = {
    getAttribute: jasmine.createSpy('getAttribute').and.returnValue('mass'),
    isCategorySet: jasmine.createSpy('isCategorySet').and.returnValue(true),
    getItems: jasmine.createSpy('getItems').and.returnValue(of({
      results: [{ uid: 1 }, { uid: 2 }, { uid: 3 }]
    })),
    getItem: jasmine.createSpy('getItem').and.callFake((id: number) => {
      const items = [
        { id: 1, result: { properties: { name: 'Name1', mass: 100, height: 200 } } },
        { id: 2, result: { properties: { name: 'Name2', mass: 50, height: 150 } } },
        { id: 3, result: { properties: { name: 'Name3', mass: 75, height: 180 } } }
      ];
      return of(items.find( item => item.id == id));
    })
  };

  const mockRouter = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SwapiService, useValue: mockSwapiService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should winner be determined after play button is pressed', () => {
    component.opponent1 = { properties: { mass: 100, height: 200 } };
    component.opponent2 = { properties: { mass: 50, height: 150 } };

    component.play();

    expect(component.winnerIndex).toBe(0);
  });

  it('should play again button reload into new opponents', () => {

    const opponent1 = { properties: { mass: 100, height: 200 } };
    const opponent2 = { properties: { mass: 50, height: 150 } };
    component.opponent1 = opponent1;
    component.opponent2 = opponent2;

    component.play();

    expect(component.playButtonLabel).toBe(component.PLAY_AGAIN);
    expect(component.winnerIndex).toBeDefined();

    component.play();

    expect(component.opponent1).not.toEqual(opponent1);
    expect(component.opponent2).not.toEqual(opponent2);
    expect(component.playButtonLabel).toBe(component.PLAY);
    expect(component.winnerIndex).toBe(null);
  });
});
