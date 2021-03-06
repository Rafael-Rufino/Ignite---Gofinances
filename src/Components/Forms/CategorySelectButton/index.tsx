import React from "react";

import { Container, Category, Icon } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
}
const CategorySelectButton: React.FC<Props> = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;
