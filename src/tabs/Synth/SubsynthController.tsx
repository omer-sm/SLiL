import { useSnapshot } from 'valtio';
import { subSynthOpts } from '../../state/Synth/synthState';
import { waveforms } from '../../utils/waveforms';
import { Flex, Form, Select, Slider } from 'antd';

interface SubsynthControllerProps {
  subsynth: subSynthOpts;
}

export default function SubsynthController({ subsynth }: SubsynthControllerProps) {
  const subsynthSnap = useSnapshot(subsynth);

  return (
    <Flex vertical>
      <Form.Item label="Waveform">
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

      <Form.Item label="volume">
        <Slider
          value={subsynthSnap.volume}
          onChange={(value) => (subsynth.volume = value)}
          min={-24}
          max={6}
        />
      </Form.Item>

      <Form.Item label="shift">
        <Slider
          value={subsynthSnap.semitoneShift}
          onChange={(value) => (subsynth.semitoneShift = value)}
          min={-36}
          max={36}
        />
      </Form.Item>
    </Flex>
  );
}
