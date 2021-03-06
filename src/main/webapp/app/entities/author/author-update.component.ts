import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IAuthor, Author } from 'app/shared/model/author.model';
import { AuthorService } from './author.service';

@Component({
  selector: 'jhi-author-update',
  templateUrl: './author-update.component.html'
})
export class AuthorUpdateComponent implements OnInit {
  author: IAuthor;
  isSaving: boolean;
  birthDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    birthDate: [null, [Validators.required]]
  });

  constructor(protected authorService: AuthorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ author }) => {
      this.updateForm(author);
      this.author = author;
    });
  }

  updateForm(author: IAuthor) {
    this.editForm.patchValue({
      id: author.id,
      name: author.name,
      birthDate: author.birthDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const author = this.createFromForm();
    if (author.id !== undefined) {
      this.subscribeToSaveResponse(this.authorService.update(author));
    } else {
      this.subscribeToSaveResponse(this.authorService.create(author));
    }
  }

  private createFromForm(): IAuthor {
    const entity = {
      ...new Author(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      birthDate: this.editForm.get(['birthDate']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuthor>>) {
    result.subscribe((res: HttpResponse<IAuthor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
