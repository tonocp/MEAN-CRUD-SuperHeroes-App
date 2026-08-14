import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmarComponent } from './confirmar.component';
import { MaterialModule } from '../../../material/material.module';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

describe('ConfirmarComponent', () => {
  let fixture: ComponentFixture<ConfirmarComponent>;
  let component: ConfirmarComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmarComponent>>;

  const heroe: Heroe = {
    _id: 'abc123',
    superhero: 'Superman',
    publisher: Publisher.DCComics,
    alter_ego: 'Clark Kent',
    first_appearance: 'Action Comics #1',
    characters: 'Lois Lane',
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmarComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: heroe },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the hero name in the confirmation message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Superman');
  });

  it('borrar() closes the dialog with true', () => {
    component.borrar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('cancelar() closes the dialog with no result', () => {
    component.cancelar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });
});
