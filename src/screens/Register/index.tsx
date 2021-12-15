import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import Button from "../../Components/Forms/Button";
import CategorySelectButton from "../../Components/Forms/CategorySelectButton";
import Input from "../../Components/Forms/Input";
import { InputForm } from "../../Components/Forms/InputForm";
import TransactionTypeButton from "../../Components/Forms/TransactionTypeButton";
import CategorySelect from "../CategorySelect";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Header, Title, Form, Fields, Transactions } from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }
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
                title="income"
                type="up"
                onPress={() => handleTransactionTypeSelect("up")}
                isActive={transactionType === "up"}
              />
              <TransactionTypeButton
                onPress={() => handleTransactionTypeSelect("down")}
                title="outocome"
                type="down"
                isActive={transactionType === "down"}
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
