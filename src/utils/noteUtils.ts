import { Frequency, Note } from "tone/build/esm/core/type/Units"
import { AdditionalSubsynthOpts } from "../driver/DriverSynth"
import { isArray } from "tone"

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const transposeNote = (note: string, semitoneShift: number): string => {
    if (semitoneShift === 0) {
        return note;
    }

    // Extract note and octave
    const match = note.match(/^([A-G]#?)(\d+)$/);
    if (!match) throw new Error('Invalid note format');

    const [, pitchClass, octaveStr] = match;
    const baseIndex = notes.indexOf(pitchClass);
    const octave = parseInt(octaveStr);

    if (baseIndex === -1) throw new Error('Invalid note name');

    // Calculate absolute semitone index
    const currentSemitone = octave * 12 + baseIndex;
    const newSemitone = currentSemitone + semitoneShift;

    if (newSemitone < 0) throw new Error('Note goes below valid range');

    const newOctave = Math.floor(newSemitone / 12);
    const newNoteIndex = newSemitone % 12;

    return `${notes[newNoteIndex]}${newOctave}`;
};

export const transposeNotes = (
    notes: Frequency | Frequency[],
    { noteModifier }: AdditionalSubsynthOpts
) => isArray(notes) 
    ? notes.map((note) => transposeNote(note as Note, noteModifier))
    : transposeNote(notes as Note, noteModifier)