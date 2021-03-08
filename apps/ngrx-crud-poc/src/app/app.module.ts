import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { BooksModule } from '@ngrx-crud-poc/books';
import { RouterModule } from '@angular/router';
import { NxModule } from '@nrwl/angular';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(
      [],
      {
        initialNavigation: 'enabled',
        paramsInheritanceStrategy: 'always',
        scrollPositionRestoration: 'enabled'
      }
    ),
    BooksModule,
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    NxModule.forRoot(),
    NgrxStoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 100 }),
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
