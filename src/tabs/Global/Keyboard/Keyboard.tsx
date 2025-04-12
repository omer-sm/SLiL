import { Button, Flex } from 'antd'
import useToken from 'antd/es/theme/useToken'
import { blackKey, keyboardContainer, whiteKey } from './keyboardStyle'
import { CSSProperties, useEffect, useRef } from 'react'
import driverSynth from '../../../driver/driver'
import { getTransport, start } from 'tone'

const keys = [
    ['C', 'C#'],
    ['D', 'D#'],
    ['E', ''],
    ['F', 'F#'],
    ['G', 'G#'],
    ['A', 'A#'],
    ['B', '']];

const octaves = [2, 3, 4, 5, 6, 7];

const playNote = async (note: string, octave: number) => {
    if (getTransport().state !== 'started') {
        await start();
    }
    
    driverSynth.triggerAttack(`${note}${octave}`);

    window.addEventListener('mouseup', () => {
        driverSynth.triggerRelease(`${note}${octave}`);
    }, {once: true});
}

export default function Keyboard() {
    const token = useToken()[1];
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        requestAnimationFrame(() => {
          container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
        });
      }
    }, []);

    return (
        <Flex style={keyboardContainer as CSSProperties} ref={containerRef}>
            {octaves.map((octave) => keys.map(([note, sharpNote]) => (
                <div style={{position: 'relative'}} key={note}>
                    <Button 
                    color={note.startsWith('C') ? 'primary' : 'geekblue'}
                    variant='filled'
                    style={whiteKey}
                    onMouseDown={() => playNote(note, octave)}
                    >{note}{octave}</Button>
                    {sharpNote !== '' && (
                        <Button 
                        color='geekblue'
                        variant='filled'
                        onMouseDown={() => playNote(sharpNote, octave)}
                        style={blackKey(token)}>{sharpNote}{octave}</Button>
                    )}
              </div>
            )))}
        </Flex>
    )
}
