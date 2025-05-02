import { useSnapshot } from 'valtio';
import { SubSynthOpts } from '../../state/Synth/synthState';
import { waveforms } from '../../utils/waveforms';
import { Flex, Form, Select, Slider } from 'antd';

interface SubsynthControllerProps {
  subsynth: SubSynthOpts;
}

export default function SubsynthController({ subsynth }: SubsynthControllerProps) {
  const subsynthSnap = useSnapshot(subsynth);

  return (
    <Flex vertical>
      <Form.Item label="Waveform" style={{marginBottom: 0}}>
        <Select
          style={{ minWidth: '10rem' }}
          value={subsynthSnap.waveform}
          onChange={(newWaveform) => (subsynth.waveform = newWaveform)}
          options={waveforms.map((waveform) => ({
            value: waveform,
            label: waveform,
          }))}
        />
      </Form.Item>

      <Form.Item label="volume" style={{marginBottom: 0}}>
        <Slider
          value={subsynthSnap.volume}
          onChange={(value) => (subsynth.volume = value)}
          min={-24}
          max={6}
        />
      </Form.Item>

      <Form.Item label="shift" style={{marginBottom: 0}}>
        <Slider
          value={subsynthSnap.semitoneShift}
          onChange={(value) => (subsynth.semitoneShift = value)}
          min={-36}
          max={36}
        />
      </Form.Item>

      <Form.Item label="Unison Voices" style={{marginBottom: 0}}>
        <Slider
          value={subsynthSnap.unisonOpts.voices}
          onChange={(value) => (subsynth.unisonOpts.voices = value)}
          min={1}
          max={16}
        />
      </Form.Item>

      <Form.Item label="Unison Detune" style={{marginBottom: 0}}>
        <Slider
          value={subsynthSnap.unisonOpts.detune}
          onChange={(value) => (subsynth.unisonOpts.detune = value)}
          min={0}
          max={240}
        />
      </Form.Item>
    </Flex>
  );
}
