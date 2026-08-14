import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HeroeTarjetaComponent } from './heroe-tarjeta.component';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { MaterialModule } from '../../../material/material.module';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

describe('HeroeTarjetaComponent', () => {
  let fixture: ComponentFixture<HeroeTarjetaComponent>;
  let component: HeroeTarjetaComponent;

  const heroe: Heroe = {
    _id: 'abc123',
    superhero: 'Superman',
    publisher: Publisher.DCComics,
    alter_ego: 'Clark Kent',
    first_appearance: 'Action Comics #1',
    characters: 'Lois Lane',
    alt_img: 'assets/heroes/superman.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroeTarjetaComponent, ImagenPipe],
      imports: [MaterialModule, NoopAnimationsModule, RouterLink],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroeTarjetaComponent);
    component = fixture.componentInstance;
  });

  it('renders the hero fields', () => {
    component.heroe = heroe;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Superman');
    expect(compiled.querySelector('mat-card-subtitle')?.textContent).toContain('Clark Kent');
    expect(compiled.textContent).toContain('DC Comics');
    expect(compiled.textContent).toContain('Action Comics #1');
  });

  it('shows the "Editar" button for a non-seeded hero', () => {
    component.heroe = { ...heroe, seeded: false };
    fixture.detectChanges();

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('button');
    const textos = Array.from(buttons).map((b) => b.textContent?.trim());
    expect(textos.some((t) => t?.includes('Editar'))).toBeTrue();
  });

  it('hides the "Editar" button for a seeded hero', () => {
    component.heroe = { ...heroe, seeded: true };
    fixture.detectChanges();

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('button');
    const textos = Array.from(buttons).map((b) => b.textContent?.trim());
    expect(textos.some((t) => t?.includes('Editar'))).toBeFalse();
  });
});
