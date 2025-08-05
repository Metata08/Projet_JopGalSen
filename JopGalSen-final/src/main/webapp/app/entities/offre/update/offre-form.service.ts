import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

type OffreFormDefaults = Pick<NewOffre, 'id' | 'urgent' | 'postes'>;

type OffreFormGroupContent = {
  id: FormControl<IOffre['id'] | NewOffre['id']>;
  titre: FormControl<IOffre['titre']>;
  description: FormControl<IOffre['description']>;
  entreprise: FormControl<IOffre['entreprise']>;
  localite: FormControl<IOffre['localite']>;
  categorie: FormControl<IOffre['categorie']>;
  experience: FormControl<IOffre['experience']>;
  exigences: FormControl<IOffre['exigences']>;
  benefice: FormControl<IOffre['benefice']>;
  dateDePostule: FormControl<IOffre['dateDePostule']>;
  dateDeFin: FormControl<IOffre['dateDeFin']>;
  urgent: FormControl<IOffre['urgent']>;
  remuneration: FormControl<IOffre['remuneration']>;
  contrat: FormControl<IOffre['contrat']>;
  recruteur: FormControl<IOffre['recruteur']>;
  postes: FormControl<IOffre['postes']>;
};

export type OffreFormGroup = FormGroup<OffreFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OffreFormService {
  createOffreFormGroup(offre: OffreFormGroupInput = { id: null }): OffreFormGroup {
    const offreRawValue = {
      ...this.getFormDefaults(),
      ...offre,
    };
    return new FormGroup<OffreFormGroupContent>({
      id: new FormControl(
        { value: offreRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      titre: new FormControl(offreRawValue.titre, {
        validators: [Validators.required],
      }),
      description: new FormControl(offreRawValue.description),
      entreprise: new FormControl(offreRawValue.entreprise),
      localite: new FormControl(offreRawValue.localite),
      categorie: new FormControl(offreRawValue.categorie),
      experience: new FormControl(offreRawValue.experience),
      exigences: new FormControl(offreRawValue.exigences),
      benefice: new FormControl(offreRawValue.benefice),
      dateDePostule: new FormControl(offreRawValue.dateDePostule),
      dateDeFin: new FormControl(offreRawValue.dateDeFin),
      urgent: new FormControl(offreRawValue.urgent),
      remuneration: new FormControl(offreRawValue.remuneration),
      contrat: new FormControl(offreRawValue.contrat, {
        validators: [Validators.required],
      }),
      recruteur: new FormControl(offreRawValue.recruteur),
      postes: new FormControl(offreRawValue.postes ?? []),
    });
  }

  getOffre(form: OffreFormGroup): IOffre | NewOffre {
    return form.getRawValue() as IOffre | NewOffre;
  }

  resetForm(form: OffreFormGroup, offre: OffreFormGroupInput): void {
    const offreRawValue = { ...this.getFormDefaults(), ...offre };
    form.reset(
      {
        ...offreRawValue,
        id: { value: offreRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OffreFormDefaults {
    return {
      id: null,
      urgent: false,
      postes: [],
    };
  }
}
