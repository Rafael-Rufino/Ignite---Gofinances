import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
  name: string;
  onPress: () => void;
}
const Button: React.FC<Props> = ({ name, onPress, ...rest }) => {
  return (
    <Container {...rest} onPress={onPress}>
      <Title>{name}</Title>
    </Container>
  );
};

export default Button;
