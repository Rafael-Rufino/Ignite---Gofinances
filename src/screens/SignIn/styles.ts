import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1; ;
`;
export const Header = styled.View`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  align-items: center;
`;
export const TitleWrapper = styled.View`
  align-items: center;
`;
export const Title = styled.Text`
  text-align: center;
  margin-top: 45px;
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`;
export const SignInTitle = styled.Text`
  text-align: center;
  margin-top: 80px;
  margin-bottom: 67px;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;
export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
  justify-content: space-between;
`;

export const Footer = styled.View`
  width: 100%
  height: 30%
  background-color: ${({ theme }) => theme.colors.secondary}
`;
