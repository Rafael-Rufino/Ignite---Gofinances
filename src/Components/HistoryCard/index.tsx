import React from "react";

import { Container, Title, Amount } from "./styles";

interface HistoryProps {
  title: string;
  amount: string;
  color: string;
}

export const HistoryCard: React.FC<HistoryProps> = ({
  title,
  amount,
  color,
}) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
};
