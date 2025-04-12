import { ConfigProvider, Flex, Layout } from "antd"
import { tabs } from "./utils/tabs"
import { useState } from "react"
import Keyboard from "./tabs/Global/Keyboard/Keyboard"
import Navbar from "./tabs/Global/Navbar/Navbar"
import { useSnapshot } from "valtio"
import { themeState } from "./state/themeState"

function App() {
  const [currentTab, setCurrentTab] = useState('1');
  const { algorithm, token } = useSnapshot(themeState);

  return (
    <ConfigProvider theme={{algorithm, token}}>
      <Layout style={{ height: '100dvh' }}>
        <Layout.Header style={{padding: 0}}>
          <Navbar {...{setCurrentTab}} />
        </Layout.Header>
        <Layout.Content>
          <Flex vertical justify="space-between" style={{height: '100%'}}>
            <Flex vertical style={{height: 'calc(100% - 7rem)'}}>
            {tabs.find(({key}) => key === +currentTab)?.component}
            </Flex>
            <Keyboard />
          </Flex>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
