import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IUsers, NewUsers } from '../users.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsers for edit and NewUsersFormGroupInput for create.
 */
type UsersFormGroupInput = IUsers | PartialWithRequiredKeyOf<NewUsers>;

type UsersFormDefaults = Pick<NewUsers, 'id'>;

type UsersFormGroupContent = {
  id: FormControl<IUsers['id'] | NewUsers['id']>;
  email: FormControl<IUsers['email']>;
  password: FormControl<IUsers['password']>;
  name: FormControl<IUsers['name']>;
  role: FormControl<IUsers['role']>;
  telephone: FormControl<IUsers['telephone']>;
  entreprise: FormControl<IUsers['entreprise']>;
  visiteur: FormControl<IUsers['visiteur']>;
  recruteur: FormControl<IUsers['recruteur']>;
};

export type UsersFormGroup = FormGroup<UsersFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsersFormService {
  createUsersFormGroup(users: UsersFormGroupInput = { id: null }): UsersFormGroup {
    const usersRawValue = {
      ...this.getFormDefaults(),
      ...users,
    };
    return new FormGroup<UsersFormGroupContent>({
      id: new FormControl(
        { value: usersRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      email: new FormControl(usersRawValue.email, {
        validators: [Validators.required],
      }),
      password: new FormControl(usersRawValue.password, {
        validators: [Validators.required],
      }),
      name: new FormControl(usersRawValue.name),
      role: new FormControl(usersRawValue.role, {
        validators: [Validators.required],
      }),
      telephone: new FormControl(usersRawValue.telephone),
      entreprise: new FormControl(usersRawValue.entreprise),
      visiteur: new FormControl(usersRawValue.visiteur),
      recruteur: new FormControl(usersRawValue.recruteur),
    });
  }

  getUsers(form: UsersFormGroup): IUsers | NewUsers {
    return form.getRawValue() as IUsers | NewUsers;
  }

  resetForm(form: UsersFormGroup, users: UsersFormGroupInput): void {
    const usersRawValue = { ...this.getFormDefaults(), ...users };
    form.reset(
      {
        ...usersRawValue,
        id: { value: usersRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): UsersFormDefaults {
    return {
      id: null,
    };
  }
}
