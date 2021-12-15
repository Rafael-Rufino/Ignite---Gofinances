import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  name: string;
}
const Button: React.FC<Props> = ({ name, ...rest }) => {
  return (
    <Container {...rest}>
      <Title>{name}</Title>
    </Container>
  );
};

export default Button;
