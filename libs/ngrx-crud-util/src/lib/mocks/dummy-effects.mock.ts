import { Dummy } from './Dummy';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { DummyService } from './dummy.service';
import { listingActionCreatorFactory } from '../actions/listing-action-creator-factory';
import { ListingEffects } from '../effects/listing.effects';


@Injectable()
export class DummyEffects extends ListingEffects<Dummy> {
  constructor(
    protected actions$: Actions,
    protected crudService: DummyService,
  ) {
    super(actions$, listingActionCreatorFactory<Dummy>('DUMMY'));
  }
}
