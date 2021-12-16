import React from "react";

import {
  Container,
  Header,
  Title,
  Amount,
  Category,
  Date,
  Footer,
  Icon,
  CategoryName,
} from "./styles";

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Header>
        <Title>{data.name}</Title>
        <Amount type={data.type}>
          {data.type === "negative" && "-"}
          {data.amount}
        </Amount>
      </Header>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName> {data.category.name} </CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
