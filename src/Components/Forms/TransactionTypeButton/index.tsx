import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title, Icon, Button } from "./styles";
const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};
interface Props extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
  onPress: () => void;
}
const TransactionTypeButton: React.FC<Props> = ({
  type,
  title,
  isActive,
  onPress,
  ...rest
}) => {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest} onPress={onPress}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};

export default TransactionTypeButton;
