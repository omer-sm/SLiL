import { Flex, Form, Slider } from 'antd';
import { useSnapshot } from 'valtio';
import { synthState } from '../../state/Synth/synthState';

export default function EnvelopeController() {
  const envelopeSnap = useSnapshot(synthState.masterEnvelope);

  return (
    <Flex vertical>
      <Form.Item label="Attack">
        <Slider
          min={0}
          max={5}
          step={0.01}
          value={envelopeSnap.attack as number}
          onChange={(value) => (synthState.masterEnvelope.attack = value)}
        />
      </Form.Item>
      <Form.Item label="Decay">
        <Slider
          min={0}
          max={5}
          step={0.01}
          value={envelopeSnap.decay as number}
          onChange={(value) => (synthState.masterEnvelope.decay = value)}
        />
      </Form.Item>
      <Form.Item label="Sustain">
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={envelopeSnap.sustain}
          onChange={(value) => {
            synthState.masterEnvelope.sustain = value;
          }}
        />
      </Form.Item>
      <Form.Item label="Release">
        <Slider
          min={0}
          max={5}
          step={0.01}
          value={envelopeSnap.release as number}
          onChange={(value) => (synthState.masterEnvelope.release = value)}
        />
      </Form.Item>
    </Flex>
  );
}
