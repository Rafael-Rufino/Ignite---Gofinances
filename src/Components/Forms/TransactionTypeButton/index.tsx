import React from "react";
import { TouchableOpacity } from "react-native";

import { Container, Title, Icon } from "./styles";
const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};
interface Props extends TouchableOpacity {
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
    <Container {...rest} isActive={isActive} type={type} onPress={onPress}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};

export default TransactionTypeButton;
