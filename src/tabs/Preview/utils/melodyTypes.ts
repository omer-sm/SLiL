import { Note } from 'tone/build/esm/core/type/NoteUnits';
import { Time } from 'tone/build/esm/core/type/Units';

export interface MelodyNote {
  note: Note;
  duration: Time;
  startTime: Time;
}

export interface Melody {
  name: string;
  bpm: number;
  notes: MelodyNote[];
}
