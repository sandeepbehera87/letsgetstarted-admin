/**
 * Vitest setup for Angular (replaces setup-jest.ts + jest-preset-angular)
 */
import 'zone.js';
import 'zone.js/testing';

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Initialize Angular TestBed environment (required for services, components, etc.)
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: true },
  }
);

// Provide common testing shims for router and NgRx Store so minimal specs continue to work.
// We do this inside beforeEach so specs can override providers as needed.
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
      {
        provide: Store,
        useValue: {
          select: () => of(null),
          dispatch: () => {},
        },
      },
    ],
  });
});

// ts-mockery usage removed during Jest → Vitest migration (no longer needed)
