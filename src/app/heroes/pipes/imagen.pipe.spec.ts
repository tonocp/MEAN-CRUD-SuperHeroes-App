import { ImagenPipe } from './imagen.pipe';
import { Heroe, Publisher } from '../interfaces/heroes.interface';

describe('ImagenPipe', () => {
  const pipe = new ImagenPipe();

  const baseHeroe: Heroe = {
    superhero: 'Superman',
    publisher: Publisher.DCComics,
    alter_ego: 'Clark Kent',
    first_appearance: 'Action Comics #1',
    characters: 'Lois Lane',
  };

  it('returns alt_img when the hero has one', () => {
    const heroe: Heroe = { ...baseHeroe, alt_img: 'assets/heroes/superman.jpg' };
    expect(pipe.transform(heroe)).toBe('assets/heroes/superman.jpg');
  });

  it('returns the placeholder when alt_img is missing', () => {
    const heroe: Heroe = { ...baseHeroe };
    expect(pipe.transform(heroe)).toBe('assets/no-image.png');
  });

  it('returns the placeholder when alt_img is an empty string', () => {
    const heroe: Heroe = { ...baseHeroe, alt_img: '' };
    expect(pipe.transform(heroe)).toBe('assets/no-image.png');
  });
});
