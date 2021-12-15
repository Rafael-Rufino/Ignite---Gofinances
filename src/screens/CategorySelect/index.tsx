import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Button from "../../Components/Forms/Button";
import { categories } from "../../utils/categories";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separador,
  Footer,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<Props> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  function handleCategorySelect(category: Category) {
    setCategory(category);
  }
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separador />}
      />
      <Footer>
        <Button name="Selecionar" onPress={closeSelectCategory}></Button>
      </Footer>
    </Container>
  );
};

export default CategorySelect;