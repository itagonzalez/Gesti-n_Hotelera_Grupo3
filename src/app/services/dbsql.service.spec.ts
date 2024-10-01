import { TestBed } from '@angular/core/testing';

import { DbsqlService } from './dbsql.service';

describe('DbsqlService', () => {
  let service: DbsqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbsqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
