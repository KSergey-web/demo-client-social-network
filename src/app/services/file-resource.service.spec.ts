import { TestBed } from '@angular/core/testing';

import { FileResourceService } from './file-resource.service';

describe('FileResourceService', () => {
  let service: FileResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
