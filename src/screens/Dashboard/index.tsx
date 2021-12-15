import React from "react";
import { HighlightCard } from "../../Components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../Components/TransactionCard";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  UserGreenting,
  UserName,
  User,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from "./styles";
export interface DataListProps extends TransactionCardProps {
  id: string;
}
export const Dashboard: React.FC = () => {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Hamburgueria Pyzzy",
      amount: " R$ 59,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020",
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel de apartamento",
      amount: " R$ 1200,000",
      category: {
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "27/04/2020",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/45695326?v=4",
              }}
            />
            <User>
              <UserGreenting>Ola,</UserGreenting>
              <UserName>Rafael</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="17.400,00"
          lastTransaction="Ultimas entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saidas"
          amount="1.259,00"
          lastTransaction="Ultimas saida dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Entrada"
          amount="16.141,00"
          lastTransaction="01 á 16 de abril"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
