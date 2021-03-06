import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterStarterSharedModule } from 'app/shared';
import {
  AuthorComponent,
  AuthorDetailComponent,
  AuthorUpdateComponent,
  AuthorDeletePopupComponent,
  AuthorDeleteDialogComponent,
  authorRoute,
  authorPopupRoute
} from './';

const ENTITY_STATES = [...authorRoute, ...authorPopupRoute];

@NgModule({
  imports: [JhipsterStarterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AuthorComponent, AuthorDetailComponent, AuthorUpdateComponent, AuthorDeleteDialogComponent, AuthorDeletePopupComponent],
  entryComponents: [AuthorComponent, AuthorUpdateComponent, AuthorDeleteDialogComponent, AuthorDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterStarterAuthorModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
