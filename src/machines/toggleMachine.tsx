import { setup } from 'xstate';

export const toggleMachine = setup({}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCSAdgIYDGyAlgG5gDEAKgPIDiTAMgKIDaADALqKgADqljkKqAgJAAPRAEYArAA4cAFjmruANgBMCgDQgAnvIDMOgL4XDaDNhwBBMlVqMWHHvyQhho8ZO9ZBEUVdU1dA2NEJTkcBStrEAJUCDgpWywwKV8xcgkpIIBaLUMTBGKrG3RM-GJnamyRXPzAxFUdUuiAdjilU36Bwf7KkAz7JwoG7xz-AsQdJR0cLrluAE5TLsiyte4cbj6ho4SLIA */
  id: 'toggle',
  initial: 'Inactive',
  states: {
    Inactive: {
      on: {
        TOGGLE: 'Active',
      },
    },
    Active: {
      on: {
        TOGGLE: 'Inactive',
      },
    },
  },
});
