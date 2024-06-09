import { Routes } from '@angular/router';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { BattleComponent } from './battle/battle.component';

export const routes: Routes = [
  { path: '', component: SelectCategoryComponent },
  { path: 'battle', component: BattleComponent }
];
