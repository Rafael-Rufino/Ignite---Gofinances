import React from "react";
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
} from "./styles";

export const Dashboard: React.FC = () => {
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
          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
};
