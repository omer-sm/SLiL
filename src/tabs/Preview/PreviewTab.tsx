import { Button, List } from "antd";
import { useState } from "react";
import driverSynth from "../../driver/driver";
import { Time, getTransport } from "tone";
import { Melody } from "./utils/melodyTypes"
import { melodies } from "./utils/melodies"

export default function PreviewTab() {
    const [isPlaying, setIsPlaying] = useState(false);

    const playMelody = async (melody: Melody) => {
        if (isPlaying) return;
        setIsPlaying(true);

        getTransport().bpm.value = melody.bpm;

        for (const note of melody.notes) {
            setTimeout(() => {
                driverSynth.triggerAttackRelease(note.note, note.duration);
            }, Time(note.startTime).toMilliseconds());
        }

        // Wait for the last note to finish before resetting the state
        const totalDuration = Math.max(...melody.notes.map((note) =>
            Time(note.startTime).toMilliseconds())) + 500;
        setTimeout(() => setIsPlaying(false), totalDuration);
    };

    return (
        <List
            bordered
            dataSource={melodies}
            renderItem={(melody) => (
                <List.Item>
                    <Button
                        type="primary"
                        onClick={() => playMelody(melody)}
                        disabled={isPlaying}
                    >
                        Play {melody.name}
                    </Button>
                </List.Item>
            )}
        />
    );
}