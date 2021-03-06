import React, { useCallback, useState } from "react";
import { HistoryCard } from "../../Components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
} from "./styles";
import { LoadContainer } from "../Dashboard/styles";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export const Resume: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);
  const { user } = useAuth();
  const theme = useTheme();

  function handleDateChange(action: "next" | "prev"): void {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
      console.log(newDate);
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setLoading(true);
    const dataKey = `@gofinances:transactions:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensives: TransactionData) =>
        expensives.type === "negative" &&
        new Date(expensives.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensives.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensives: TransactionData) => {
        return acumullator + Number(expensives.amount);
      },
      0
    );
    const totalByCategory: CategoryData[] = [];
    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });
    setTotalByCategory(totalByCategory);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>
            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategory}
              x="percent"
              y="total"
              colorScale={totalByCategory.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
            />
          </ChartContainer>
          {totalByCategory.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};
