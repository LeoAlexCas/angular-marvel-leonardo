import { CapitalizePipe } from './capitalize.pipe';
import { TestBed, inject, async } from '@angular/core/testing';

describe('CapitalizePipe', () => {
  let pipe;
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ CapitalizePipe ]
  }));
  
  beforeEach(inject([CapitalizePipe], (p:CapitalizePipe) => {
    pipe = p;
  }));
  
  it('crea la instancia', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería funcionar con un string vacío', () => {
    expect(pipe.transform('')).toEqual('');
  });
  
  it('debería realizar la transformación de Capitalize', () => {
    expect(pipe.transform('wow')).toEqual('WOW');
  });
  
  it('debería lanzar error por valores inválidos', () => {
    expect(()=>pipe.transform(undefined)).toThrow();
    expect(()=>pipe.transform()).toThrow();
    expect(()=>pipe.transform()).toThrowError('Requires a String as input');
  });
});