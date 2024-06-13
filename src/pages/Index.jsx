import { Container, Heading, Input, Button, VStack, HStack, Checkbox, IconButton, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Input is empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleTodoCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <Heading mb={6}>Todo App</Heading>
      <HStack mb={6}>
        <Input
          placeholder="Add a new todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button colorScheme="teal" onClick={addTodo}>
          Add Todo
        </Button>
      </HStack>
      <VStack spacing={4} width="100%">
        {todos.map((todo, index) => (
          <HStack key={index} width="100%" justifyContent="space-between">
            <Checkbox
              isChecked={todo.completed}
              onChange={() => toggleTodoCompletion(index)}
            >
              {todo.text}
            </Checkbox>
            <IconButton
              aria-label="Delete todo"
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => deleteTodo(index)}
            />
          </HStack>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;