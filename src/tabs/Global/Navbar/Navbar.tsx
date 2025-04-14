import { Flex, Menu, Button } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { tabs } from '../../../utils/tabs';
import { useSnapshot } from 'valtio';
import { themeState } from '../../../state/themeState';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import useToken from 'antd/es/theme/useToken';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';

interface NavbarProps {
  setCurrentTab: Dispatch<SetStateAction<string>>;
}

export default function Navbar({ setCurrentTab }: NavbarProps) {
  const { themeMode } = useSnapshot(themeState);
  const { colorBgContainer } = useToken()[1];

  return (
    <Flex
      justify="stretch"
      align="center"
      style={{
        background: colorBgContainer,
        padding: '0 1rem',
      }}
    >
      <Menu
        theme="light"
        mode="horizontal"
        items={tabs}
        defaultSelectedKeys={['1']}
        onClick={(e) => setCurrentTab(e.key)}
        style={{ width: '100%' }}
      />
      <Button
        shape="circle"
        size="large"
        color={themeMode === 'dark' ? 'blue' : 'gold'}
        variant="text"
        icon={
          themeMode === 'dark' ? (
            <DarkModeTwoToneIcon fontSize="large" />
          ) : (
            <LightModeTwoToneIcon fontSize="large" />
          )
        }
        onClick={() => (themeState.themeMode = themeMode === 'dark' ? 'light' : 'dark')}
      ></Button>
    </Flex>
  );
}
