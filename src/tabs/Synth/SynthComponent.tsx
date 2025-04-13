import { Card, Col, Flex, Row } from "antd"
import SubsynthController from "./SubsynthController"
import { synthState } from "../../state/Synth/synthState"

export default function SynthComponent() {
    return (
        <>
            <Row style={{ height: '100%' }}>
                <Col span={19}>
                    <Card style={{ height: '100%' }}>
                        <Flex justify='space-evenly'>
                            <Card type='inner' title='SubSynth 1'>
                                <SubsynthController subsynth={synthState.synth1Opts} />
                            </Card>
                            <Card type='inner' title='SubSynth 2'>
                                <SubsynthController subsynth={synthState.synth2Opts} />
                            </Card>
                        </Flex>
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title='Filter' style={{ height: '100%' }}>

                    </Card>
                </Col>
            </Row>
            <Row style={{ height: '100%' }}>
                <Col span={5}>
                    <Card title='Envelope' style={{ height: '100%' }}>
                    </Card>
                </Col>
                <Col span={19}>
                    <Card title='LFO' style={{ height: '100%' }}>
                    </Card>
                </Col>
            </Row>
        </>
    )
}