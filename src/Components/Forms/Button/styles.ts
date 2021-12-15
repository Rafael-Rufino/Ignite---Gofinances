import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import theme from "../../../global/styles/theme";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 18px;
  border-radius: 5px;
  align-items: center;
  margin-top: 8px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
