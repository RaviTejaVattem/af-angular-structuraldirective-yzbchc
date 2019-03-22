import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShowRequiredDirective } from './show-required.directive';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule, MatInputModule } from '@angular/material';
import { ShowAllShowFewComponent } from './show-all-show-few/show-all-show-few.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MatChipsModule, MatCommonModule, MatInputModule],
  declarations: [AppComponent, ShowRequiredDirective, ShowAllShowFewComponent],
  bootstrap: [AppComponent],
  entryComponents: [ShowAllShowFewComponent]
})
export class AppModule { }
