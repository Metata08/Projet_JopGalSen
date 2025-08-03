import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOffre, NewOffre } from '../offre.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOffre for edit and NewOffreFormGroupInput for create.
 */
type OffreFormGroupInput = IOffre | PartialWithRequiredKeyOf<NewOffre>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOffre | NewOffre> = Omit<T, 'postedDate'> & {
  postedDate?: string | null;
};

type OffreFormRawValue = FormValueOf<IOffre>;

type NewOffreFormRawValue = FormValueOf<NewOffre>;

type OffreFormDefaults = Pick<NewOffre, 'id' | 'postedDate'>;

type OffreFormGroupContent = {
  id: FormControl<OffreFormRawValue['id'] | NewOffre['id']>;
  title: FormControl<OffreFormRawValue['title']>;
  company: FormControl<OffreFormRawValue['company']>;
  location: FormControl<OffreFormRawValue['location']>;
  type: FormControl<OffreFormRawValue['type']>;
  salary: FormControl<OffreFormRawValue['salary']>;
  description: FormControl<OffreFormRawValue['description']>;
  skills: FormControl<OffreFormRawValue['skills']>;
  experienceLevel: FormControl<OffreFormRawValue['experienceLevel']>;
  postedDate: FormControl<OffreFormRawValue['postedDate']>;
  recruteur: FormControl<OffreFormRawValue['recruteur']>;
  poste: FormControl<OffreFormRawValue['poste']>;
};

export type OffreFormGroup = FormGroup<OffreFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OffreFormService {
  createOffreFormGroup(offre: OffreFormGroupInput = { id: null }): OffreFormGroup {
    const offreRawValue = this.convertOffreToOffreRawValue({
      ...this.getFormDefaults(),
      ...offre,
    });
    return new FormGroup<OffreFormGroupContent>({
      id: new FormControl(
        { value: offreRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(offreRawValue.title, {
        validators: [Validators.required],
      }),
      company: new FormControl(offreRawValue.company, {
        validators: [Validators.required],
      }),
      location: new FormControl(offreRawValue.location),
      type: new FormControl(offreRawValue.type, {
        validators: [Validators.required],
      }),
      salary: new FormControl(offreRawValue.salary),
      description: new FormControl(offreRawValue.description),
      skills: new FormControl(offreRawValue.skills),
      experienceLevel: new FormControl(offreRawValue.experienceLevel),
      postedDate: new FormControl(offreRawValue.postedDate),
      recruteur: new FormControl(offreRawValue.recruteur),
      poste: new FormControl(offreRawValue.poste),
    });
  }

  getOffre(form: OffreFormGroup): IOffre | NewOffre {
    return this.convertOffreRawValueToOffre(form.getRawValue() as OffreFormRawValue | NewOffreFormRawValue);
  }

  resetForm(form: OffreFormGroup, offre: OffreFormGroupInput): void {
    const offreRawValue = this.convertOffreToOffreRawValue({ ...this.getFormDefaults(), ...offre });
    form.reset(
      {
        ...offreRawValue,
        id: { value: offreRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OffreFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      postedDate: currentTime,
    };
  }

  private convertOffreRawValueToOffre(rawOffre: OffreFormRawValue | NewOffreFormRawValue): IOffre | NewOffre {
    return {
      ...rawOffre,
      postedDate: dayjs(rawOffre.postedDate, DATE_TIME_FORMAT),
    };
  }

  private convertOffreToOffreRawValue(
    offre: IOffre | (Partial<NewOffre> & OffreFormDefaults),
  ): OffreFormRawValue | PartialWithRequiredKeyOf<NewOffreFormRawValue> {
    return {
      ...offre,
      postedDate: offre.postedDate ? offre.postedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
