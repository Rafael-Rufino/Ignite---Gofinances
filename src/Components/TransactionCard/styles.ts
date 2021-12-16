import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import theme from "../../global/styles/theme";
interface TypeProps {
  type: "positive" | "negative";
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 17px 24px;
  border-radius: 5px;
  margin-bottom: 16px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TypeProps>`
  color: ${({ theme, type }) =>
    type === "positive" ? theme.colors.success : theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
`;
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 19px;
`;
export const Category = styled.Text`
  flex-direction: row;
  align-items: center;
`;
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 17px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;
export const Header = styled.View``;
