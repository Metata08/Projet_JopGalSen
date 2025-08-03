import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
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

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICandidature | NewCandidature> = Omit<T, 'dateCandidature'> & {
  dateCandidature?: string | null;
};

type CandidatureFormRawValue = FormValueOf<ICandidature>;

type NewCandidatureFormRawValue = FormValueOf<NewCandidature>;

type CandidatureFormDefaults = Pick<NewCandidature, 'id' | 'dateCandidature'>;

type CandidatureFormGroupContent = {
  id: FormControl<CandidatureFormRawValue['id'] | NewCandidature['id']>;
  motivationLetter: FormControl<CandidatureFormRawValue['motivationLetter']>;
  cvFileUrl: FormControl<CandidatureFormRawValue['cvFileUrl']>;
  dateCandidature: FormControl<CandidatureFormRawValue['dateCandidature']>;
  visiteur: FormControl<CandidatureFormRawValue['visiteur']>;
  offre: FormControl<CandidatureFormRawValue['offre']>;
};

export type CandidatureFormGroup = FormGroup<CandidatureFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CandidatureFormService {
  createCandidatureFormGroup(candidature: CandidatureFormGroupInput = { id: null }): CandidatureFormGroup {
    const candidatureRawValue = this.convertCandidatureToCandidatureRawValue({
      ...this.getFormDefaults(),
      ...candidature,
    });
    return new FormGroup<CandidatureFormGroupContent>({
      id: new FormControl(
        { value: candidatureRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      motivationLetter: new FormControl(candidatureRawValue.motivationLetter),
      cvFileUrl: new FormControl(candidatureRawValue.cvFileUrl),
      dateCandidature: new FormControl(candidatureRawValue.dateCandidature),
      visiteur: new FormControl(candidatureRawValue.visiteur),
      offre: new FormControl(candidatureRawValue.offre),
    });
  }

  getCandidature(form: CandidatureFormGroup): ICandidature | NewCandidature {
    return this.convertCandidatureRawValueToCandidature(form.getRawValue() as CandidatureFormRawValue | NewCandidatureFormRawValue);
  }

  resetForm(form: CandidatureFormGroup, candidature: CandidatureFormGroupInput): void {
    const candidatureRawValue = this.convertCandidatureToCandidatureRawValue({ ...this.getFormDefaults(), ...candidature });
    form.reset(
      {
        ...candidatureRawValue,
        id: { value: candidatureRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CandidatureFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateCandidature: currentTime,
    };
  }

  private convertCandidatureRawValueToCandidature(
    rawCandidature: CandidatureFormRawValue | NewCandidatureFormRawValue,
  ): ICandidature | NewCandidature {
    return {
      ...rawCandidature,
      dateCandidature: dayjs(rawCandidature.dateCandidature, DATE_TIME_FORMAT),
    };
  }

  private convertCandidatureToCandidatureRawValue(
    candidature: ICandidature | (Partial<NewCandidature> & CandidatureFormDefaults),
  ): CandidatureFormRawValue | PartialWithRequiredKeyOf<NewCandidatureFormRawValue> {
    return {
      ...candidature,
      dateCandidature: candidature.dateCandidature ? candidature.dateCandidature.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
