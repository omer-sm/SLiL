import { Button, Card, Flex, List } from 'antd';
import { useState } from 'react';
import driverSynth, { lfos } from '../../driver/driver';
import { Time, getTransport } from 'tone';
import { Melody } from './utils/melodyTypes';
import { melodies } from './utils/melodies';
import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import StopTwoToneIcon from '@mui/icons-material/StopTwoTone';

export default function PreviewTab() {
  const [currentTimeouts, setCurrentTimeouts] = useState<number[]>([]);
  const [currentMelody, setCurrentMelody] = useState<Melody | null>(null);

  const stopCurrentMelody = () => {
    currentTimeouts.forEach(clearTimeout);
    setCurrentTimeouts([]);
    driverSynth.triggerRelease([]);
    setCurrentMelody(null);
  };

  const playMelody = async (melody: Melody) => {
    if (currentMelody === melody) {
      stopCurrentMelody();
      return;
    }

    stopCurrentMelody();
    setCurrentMelody(melody);

    getTransport().bpm.value = melody.bpm;
    lfos.forEach((lfo) => lfo.restartLFOs());

    const timeouts: number[] = [];
    for (const note of melody.notes) {
      const timeout = setTimeout(() => {
        driverSynth.triggerAttackRelease(note.note, note.duration);
      }, Time(note.startTime).toMilliseconds());
      timeouts.push(timeout);
    }
    setCurrentTimeouts(timeouts);

    // Wait for the last note to finish before resetting the state
    const totalDuration =
      Math.max(...melody.notes.map((note) => Time(note.startTime).toMilliseconds())) +
      500;
    const endTimeout = setTimeout(() => {
      setCurrentTimeouts([]);
      setCurrentMelody(null);
    }, totalDuration);
    timeouts.push(endTimeout);
  };

  return (
    <Flex vertical>
      <Card
        title='Sound Preview'
        styles={{
          body: {
            padding: '1rem',
          },
        }}
      >
        <List
          dataSource={melodies}
          renderItem={(melody) => (
            <List.Item>
              <Button
                icon={
                  currentMelody?.name === melody.name ? (
                    <StopTwoToneIcon />
                  ) : (
                    <PlayArrowTwoToneIcon />
                  )
                }
                iconPosition="start"
                variant="filled"
                color="cyan"
                onClick={() => playMelody(melody)}
              >
                {melody.name}
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </Flex>
  );
}
