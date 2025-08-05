import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICandidature, NewCandidature } from '../candidature.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICandidature for edit and NewCandidatureFormGroupInput for create.
 */
type CandidatureFormGroupInput = ICandidature | PartialWithRequiredKeyOf<NewCandidature>;

type CandidatureFormDefaults = Pick<NewCandidature, 'id'>;

type CandidatureFormGroupContent = {
  id: FormControl<ICandidature['id'] | NewCandidature['id']>;
  dateCandidature: FormControl<ICandidature['dateCandidature']>;
  statut: FormControl<ICandidature['statut']>;
  offre: FormControl<ICandidature['offre']>;
  candidat: FormControl<ICandidature['candidat']>;
};

export type CandidatureFormGroup = FormGroup<CandidatureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CandidatureFormService {
  createCandidatureFormGroup(candidature: CandidatureFormGroupInput = { id: null }): CandidatureFormGroup {
    const candidatureRawValue = {
      ...this.getFormDefaults(),
      ...candidature,
    };
    return new FormGroup<CandidatureFormGroupContent>({
      id: new FormControl(
        { value: candidatureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dateCandidature: new FormControl(candidatureRawValue.dateCandidature, {
        validators: [Validators.required],
      }),
      statut: new FormControl(candidatureRawValue.statut, {
        validators: [Validators.required],
      }),
      offre: new FormControl(candidatureRawValue.offre),
      candidat: new FormControl(candidatureRawValue.candidat),
    });
  }

  getCandidature(form: CandidatureFormGroup): ICandidature | NewCandidature {
    return form.getRawValue() as ICandidature | NewCandidature;
  }

  resetForm(form: CandidatureFormGroup, candidature: CandidatureFormGroupInput): void {
    const candidatureRawValue = { ...this.getFormDefaults(), ...candidature };
    form.reset(
      {
        ...candidatureRawValue,
        id: { value: candidatureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CandidatureFormDefaults {
    return {
      id: null,
    };
  }
}
