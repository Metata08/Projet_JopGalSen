import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IVisiteur, NewVisiteur } from '../visiteur.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVisiteur for edit and NewVisiteurFormGroupInput for create.
 */
type VisiteurFormGroupInput = IVisiteur | PartialWithRequiredKeyOf<NewVisiteur>;

type VisiteurFormDefaults = Pick<NewVisiteur, 'id'>;

type VisiteurFormGroupContent = {
  id: FormControl<IVisiteur['id'] | NewVisiteur['id']>;
  cv: FormControl<IVisiteur['cv']>;
};

export type VisiteurFormGroup = FormGroup<VisiteurFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VisiteurFormService {
  createVisiteurFormGroup(visiteur: VisiteurFormGroupInput = { id: null }): VisiteurFormGroup {
    const visiteurRawValue = {
      ...this.getFormDefaults(),
      ...visiteur,
    };
    return new FormGroup<VisiteurFormGroupContent>({
      id: new FormControl(
        { value: visiteurRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      cv: new FormControl(visiteurRawValue.cv),
    });
  }

  getVisiteur(form: VisiteurFormGroup): IVisiteur | NewVisiteur {
    return form.getRawValue() as IVisiteur | NewVisiteur;
  }

  resetForm(form: VisiteurFormGroup, visiteur: VisiteurFormGroupInput): void {
    const visiteurRawValue = { ...this.getFormDefaults(), ...visiteur };
    form.reset(
      {
        ...visiteurRawValue,
        id: { value: visiteurRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): VisiteurFormDefaults {
    return {
      id: null,
    };
  }
}
