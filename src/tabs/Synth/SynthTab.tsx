import { Card, Col, Flex, Row } from 'antd';
import SubsynthController from './SubsynthController';
import { synthState } from '../../state/Synth/synthState';
import EnvelopeController from './EnvelopeController';
import MasterLFOController from './LFO/MasterLFOController';
import EqualizerController from './EQ/EqualizerController';

export default function SynthTab() {
  return (
    <>
      <Row style={{ height: '100%' }}>
        <Col span={13}>
          <Card style={{ height: '100%' }}>
            <Flex justify="space-evenly">
              <Card type="inner" title="SubSynth 1">
                <SubsynthController subsynth={synthState.synth1Opts} />
              </Card>
              <Card type="inner" title="SubSynth 2">
                <SubsynthController subsynth={synthState.synth2Opts} />
              </Card>
            </Flex>
          </Card>
        </Col>
        <Col span={11}>
          <Card
            title="Equalizer"
            style={{ height: '100%' }}
            styles={{ body: { height: '80%' } }}
          >
            <EqualizerController />
          </Card>
        </Col>
      </Row>
      <Row style={{ height: '100%' }}>
        <Col span={5}>
          <Card title="Envelope" style={{ height: '100%' }}>
            <EnvelopeController />
          </Card>
        </Col>
        <Col span={19}>
          <div style={{ height: '100%' }}>
            <MasterLFOController />
          </div>
        </Col>
      </Row>
    </>
  );
}
