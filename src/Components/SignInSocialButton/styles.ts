import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import theme from "../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.shape};
  height: ${RFValue(56)}px;
  border-radius: 5px;
  margin: 10px 20px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
`;
export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(16)}px;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;
export const Text = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
export const Svg = styled(Feather)``;
