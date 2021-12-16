import React from "react";
import { categories } from "../../utils/categories";

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

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  const [category] = categories.filter((item) => item.key === data.category);
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
          <Icon name={category.icon} />
          <CategoryName> {category.name} </CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
