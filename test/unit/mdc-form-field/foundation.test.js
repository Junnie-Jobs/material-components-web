/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from 'tape';
import td from 'testdouble';

import MDCFormFieldFoundation from '../../../packages/mdc-form-field/foundation';

test('exports cssClasses', (t) => {
  t.true('cssClasses' in MDCFormFieldFoundation);
  t.end();
});

test('exports strings', (t) => {
  t.true('strings' in MDCFormFieldFoundation);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', (t) => {
  const {defaultAdapter} = MDCFormFieldFoundation;
  const methods = Object.keys(defaultAdapter).filter((k) => typeof defaultAdapter[k] === 'function');

  t.equal(methods.length, Object.keys(defaultAdapter).length, 'Every adapter key must be a function');
  t.deepEqual(methods, ['registerInteractionHandler', 'deregisterInteractionHandler', 'activateInputRipple',
      'deactivateInputRipple']);
  methods.forEach((m) => t.doesNotThrow(defaultAdapter[m]));

  t.end();
});

function setupTest() {
  const mockAdapter = td.object(MDCFormFieldFoundation.defaultAdapter);
  const foundation = new MDCFormFieldFoundation(mockAdapter);
  return {foundation, mockAdapter};
}

test('#init calls component and drawer event registrations', (t) => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();
  t.doesNotThrow(() => td.verify(mockAdapter.registerInteractionHandler('click', isA(Function))));
  t.end();
});

test('#destroy calls component and drawer event deregistrations', (t) => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();
  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInteractionHandler('click', isA(Function))));
  t.end();
});
