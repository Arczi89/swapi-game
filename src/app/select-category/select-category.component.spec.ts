import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoryComponent } from './select-category.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { By } from '@angular/platform-browser';

describe('SelectCategoryComponent', () => {
  let component: SelectCategoryComponent;
  let fixture: ComponentFixture<SelectCategoryComponent>;

  const mockRouter = { navigate: jasmine.createSpy('navigate') };
  const mockSwapiService = {
    setCategory: jasmine.createSpy('setCategory'),
    setAttribute: jasmine.createSpy('setAttribute')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCategoryComponent, MatButtonModule, MatRadioModule, MatCardModule, FormsModule],
      declarations: [],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SwapiService, useValue: mockSwapiService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass to battle only with complete gathered informations', () => {
    const button = fixture.debugElement.query(By.css('#battle-button')).nativeElement;

    component.category = '';
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();

    const categoryRadio = fixture.debugElement.query(By.css('#choose-category input[value="people"]')).nativeElement;
    categoryRadio.click();
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();

    const heightRadio = fixture.debugElement.query(By.css('#attribute-people input[value="height"]')).nativeElement;
    heightRadio.click();
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();

    const starshipsRadio = fixture.debugElement.query(By.css('#choose-category input[value="starships"]')).nativeElement;
    starshipsRadio.click();
    fixture.detectChanges();
    expect(button.disabled).toBeTruthy();

    const lengthRadio = fixture.debugElement.query(By.css('#attribute-starships input[value="length"]')).nativeElement;
    lengthRadio.click();
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();
  });

  [
    ['people', ['height', 'mass']],
    ['starships', ['cost_in_credits', 'length', 'passengers', 'cargo_capacity', 'crew']]
  ].forEach(([category, attributes]) => {
    it(`should show only attributes connected to ${category} category`, () => {
      component.category = category as string;
      fixture.detectChanges();

      const attrs = fixture.debugElement.query(By.css(`#attribute-${category}`)).children;
      expect(attrs.length).toEqual(attributes.length);

      (attributes as []).forEach((attribute: string) => {
        const radioInputs = fixture.debugElement.queryAll(By.css(`#attribute-${category} input`)).map(input => input.nativeElement.value);
        expect(radioInputs.includes(attribute)).toBeTrue;
      });
    });
  });

});

