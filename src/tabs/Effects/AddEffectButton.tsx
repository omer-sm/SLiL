import { Button } from "antd"
import { ButtonColorType } from "antd/es/button"

interface AddEffectButtonProps {
  name: string;
  createEffect: () => void;
  color: ButtonColorType;
}

export default function AddEffectButton({
  name,
  createEffect,
  color,
}: AddEffectButtonProps) {
  return (
    <Button style={{margin: '0 0.5rem'}} variant='filled' color={color} onClick={createEffect}>{name}</Button>
  );
}
