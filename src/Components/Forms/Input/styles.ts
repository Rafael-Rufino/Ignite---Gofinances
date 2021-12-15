import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import theme from "../../../global/styles/theme";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

import { TextInput } from "react-native";
export const Container = styled(TextInput)`
  width: 100%;
  padding: 18px;
  font-size: ${RFValue(14)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular}
  margin-bottom: 8px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text_dark}
`;
