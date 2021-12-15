import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import theme from "../../../global/styles/theme";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({ theme }) => theme.colors.shape}
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
`;
export const Category = styled.Text`
  color:  ${({ theme }) => theme.colors.text_dark}}
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular}
  padding: 18px 16px;
  `;
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color:  ${({ theme }) => theme.colors.text}}
`;
