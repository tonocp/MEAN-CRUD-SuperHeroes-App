import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HeroeFichaComponent } from './heroe-ficha.component';
import { ImagenPipe } from '../../pipes/imagen.pipe';
import { MaterialModule } from '../../../material/material.module';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

const heroe: Heroe = {
  _id: 'abc123',
  superhero: 'Superman',
  publisher: Publisher.DCComics,
  alter_ego: 'Clark Kent',
  first_appearance: 'Action Comics #1',
  characters: 'Lois Lane, Jimmy Olsen',
  alt_img: 'assets/heroes/superman.jpg',
};

@Component({
  standalone: false,
  selector: 'app-host-con-footer',
  template: `
    <app-heroe-ficha [heroe]="heroe">
      <button ficha-footer>Atrás</button>
    </app-heroe-ficha>
  `,
})
class HostConFooterComponent {
  heroe = heroe;
}

describe('HeroeFichaComponent', () => {
  let fixture: ComponentFixture<HeroeFichaComponent>;
  let component: HeroeFichaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroeFichaComponent, ImagenPipe, HostConFooterComponent],
      imports: [MaterialModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroeFichaComponent);
    component = fixture.componentInstance;
  });

  it('renders the hero fields', () => {
    component.heroe = heroe;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Superman');
    expect(compiled.textContent).toContain('Clark Kent');
    expect(compiled.textContent).toContain('DC Comics');
    expect(compiled.textContent).toContain('Action Comics #1');
    expect(compiled.textContent).toContain('Lois Lane, Jimmy Olsen');
    expect(compiled.querySelector('img')?.getAttribute('src')).toBe('assets/heroes/superman.jpg');
  });

  it('does not render a footer when nothing is projected', () => {
    component.heroe = heroe;
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('button')).toBeNull();
  });

  it('projects content marked [ficha-footer] from the caller', () => {
    const hostFixture = TestBed.createComponent(HostConFooterComponent);
    hostFixture.detectChanges();

    const boton = (hostFixture.nativeElement as HTMLElement).querySelector('button[ficha-footer]');
    expect(boton?.textContent).toContain('Atrás');
  });
});
