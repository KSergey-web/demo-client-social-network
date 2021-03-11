import { TestBed } from '@angular/core/testing';

import { CustomJsonInterceptor } from './custom-json.interceptor';

describe('CustomJsonInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustomJsonInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustomJsonInterceptor = TestBed.inject(CustomJsonInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
