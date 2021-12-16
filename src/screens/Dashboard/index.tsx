import React, { useState, useEffect } from "react";
import { HighlightCard } from "../../Components/HighlightCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { format } from "date-fns";

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
  const [data, setData] = useState<DataListProps[]>();

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        // const date = new Date().toLocaleDateString();
        return {
          id: item.id,
          name: item.name,
          type: item.type,
          category: item.category,
          amount,
          date,
        };
      }
    );
    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

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
