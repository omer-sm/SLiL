import { useSnapshot } from 'valtio';
import { eqState } from '../../../state/EQ/eqState';
import { Flex, Form, Slider } from 'antd';
import './labelStyle.css';
import useToken from 'antd/es/theme/useToken';

export default function EqualizerController() {
  const eqSnap = useSnapshot(eqState);
  const { colorBorder } = useToken()[1];

  return (
    <Flex vertical justify="stretch" style={{ height: '100%' }}>
      <Form.Item
        label="Frequencies"
        labelCol={{ style: { paddingBottom: 0 } }}
        layout="vertical"
        style={{ marginBottom: 0 }}
      >
        <Slider
          range
          value={eqSnap.bands.map((band) => +band.frequency)}
          onChange={(newFreqs) => {
            eqState.bands.forEach((band, index) => {
              band.frequency = newFreqs[index];
            });
          }}
          min={0}
          max={15000}
          style={{ margin: 0 }}
        />
      </Form.Item>

      <Flex justify="space-evenly" align="stretch" style={{ height: '100%' }}>
        {eqSnap.bands.map((band, index) => (
          <Form.Item
            key={index}
            label={`Band ${index + 1}`}
            labelCol={{
              style: { paddingBottom: 0, textAlign: 'center' },
              className: 'eq-label',
            }}
            layout="vertical"
            style={{
              marginBottom: 0,
              width: '100%',
              height: '100%',
              borderRight:
                index + 1 < eqSnap.bands.length ? `1px solid ${colorBorder}88` : '',
            }}
          >
            <Flex justify="center" align='stretch' style={{ height: '8rem' }}>
              <Slider
                vertical
                value={band.gain}
                onChange={(value) => (eqState.bands[index].gain = value)}
                min={-24}
                max={24}
                style={{ height: '100%' }}
                tooltip={{ formatter: (value) => `Gain: ${value} dB` }}
              />
              <Slider
                vertical
                value={band.Q}
                onChange={(value) => (eqState.bands[index].Q = value)}
                min={0}
                max={6}
                step={0.1}
                style={{ height: '100%' }}
                tooltip={{ formatter: (value) => `Q: ${value}` }}
              />
            </Flex>
          </Form.Item>
        ))}
      </Flex>
    </Flex>
  );
}
