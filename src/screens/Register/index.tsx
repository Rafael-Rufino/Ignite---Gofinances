import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import Button from "../../Components/Forms/Button";
import CategorySelectButton from "../../Components/Forms/CategorySelectButton";
import { InputForm } from "../../Components/Forms/InputForm";
import TransactionTypeButton from "../../Components/Forms/TransactionTypeButton";
import CategorySelect from "../CategorySelect";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import uuid from "react-native-uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Container, Header, Title, Form, Fields, Transactions } from "./styles";

interface FormData {
  name: string;
  amount: string;
}
type NavigationProps = {
  navigate: (screen: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("Preço é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const navigation = useNavigation<NavigationProps>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: String(new Date()),
    };
    try {
      const dataKey = "@gofinances:transactions";
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel selvar");
    }
  }
  // useEffect(() => {
  //   async function deleteAll() {
  //     const dataKey = "@gofinances:transactions";
  //     await AsyncStorage.removeItem(dataKey);
  //   }
  //   deleteAll();
  // }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              error={errors.name && errors.name.message}
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
            />
            <InputForm
              error={errors.amount && errors.amount.message}
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
            />
            <Transactions>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                onPress={() => handleTransactionTypeSelect("negative")}
                title="Outocome"
                type="down"
                isActive={transactionType === "negative"}
              />
            </Transactions>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button name="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
