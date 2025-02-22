import assert from 'node:assert';
import { describe, test } from 'node:test';

import { envVariables } from './node-env.js';

describe('Env variables', () => {
  test('should be defined', () => {
    assert.notStrictEqual(envVariables, null, 'Environment variables should not be null');
  });
});
