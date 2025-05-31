import { Flex, Menu, Button, Divider, Typography } from 'antd';
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
  const { colorBgContainer, cyan9 } = useToken()[1];

  return (
    <Flex
      justify="stretch"
      align="center"
      style={{
        background: colorBgContainer,
        padding: '0 1rem',
      }}
    >
      <Typography.Title level={3} style={{ margin: 0, color: 'inherit', width: '5rem' }}>
        SL<span style={{color: cyan9, textShadow: `${cyan9} 0px 0px 8px`}}>i</span>L
      </Typography.Title>
      <Divider type='vertical' />
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
