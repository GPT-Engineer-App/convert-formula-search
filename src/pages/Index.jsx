import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Stack, Text, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [sourceList, setSourceList] = useState("");
  const [targetList, setTargetList] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [formulas, setFormulas] = useState([]);
  const toast = useToast();

  const applyFormula = (x, formula) => {
    // A simple utility function to apply a formula to a number x.
    switch (formula) {
      case "x * 2":
        return x * 2;
      case "x + 2":
        return x + 2;
      case "2x - 1":
        return 2 * x - 1;
      case "sin(x)":
        return Math.sin(x);
      case "cos(x)":
        return Math.cos(x);
      case "x^2":
        return Math.pow(x, 2);
      case "e^x":
        return Math.exp(x);
      default:
        return x;
    }
  };

  const findFormula = () => {
    setIsSearching(true);
    setTimeout(() => {
      let successfulFormulas = [];
      const sourceNumbers = sourceList.split(",").map(Number);
      const targetNumbers = targetList.split(",").map(Number);
      const formulasToTest = ["x * 2", "x + 2", "2x - 1", "sin(x)", "cos(x)", "x^2", "e^x"];

      // Shuffle formulas to simulate random application
      formulasToTest.sort(() => Math.random() - 0.5);

      formulasToTest.forEach((formula) => {
        const transformedNumbers = sourceNumbers.map((x) => applyFormula(x, formula));
        // Check if transformed numbers match the target list
        if (JSON.stringify(transformedNumbers) === JSON.stringify(targetNumbers)) {
          successfulFormulas.push(formula);
        }
      });

      setFormulas(successfulFormulas);
      setIsSearching(false);

      toast({
        title: successfulFormulas.length > 0 ? "Formulas found." : "No matching formulas found.",
        description: successfulFormulas.length > 0 ? "We've calculated the formulas for the transformation." : "No formulas could transform the source list into the target list.",
        status: successfulFormulas.length > 0 ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Container maxW="container.md" py={10}>
      <Stack spacing={8}>
        <Heading as="h1" size="xl" textAlign="center">
          Formula Finder
        </Heading>
        <FormControl id="source-list" isRequired>
          <FormLabel>Source List (comma-separated numbers)</FormLabel>
          <Input placeholder="e.g. 1, 2, 3, 4" value={sourceList} onChange={(e) => setSourceList(e.target.value)} />
        </FormControl>
        <FormControl id="target-list" isRequired>
          <FormLabel>Target List (comma-separated numbers)</FormLabel>
          <Input placeholder="e.g. 2, 4, 6, 8" value={targetList} onChange={(e) => setTargetList(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaSearch />} colorScheme="teal" onClick={findFormula} isLoading={isSearching} loadingText="Searching">
          Find Formula
        </Button>
        {formulas.length > 0 && (
          <Box>
            <Heading as="h3" size="md">
              Possible Formulas:
            </Heading>
            <List styleType="disc">
              {formulas.map((formula, index) => (
                <ListItem key={index}>
                  <Text as="i">{formula}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Flex direction="column" align="center">
          <Heading as="h4" size="sm" mb={4}>
            Source List
          </Heading>
          <List>
            {sourceList.split(",").map((number, index) => (
              <ListItem key={index}>{number.trim()}</ListItem>
            ))}
          </List>
        </Flex>
        <Flex direction="column" align="center">
          <Heading as="h4" size="sm" mb={4}>
            Target List
          </Heading>
          <List>
            {targetList.split(",").map((number, index) => (
              <ListItem key={index}>{number.trim()}</ListItem>
            ))}
          </List>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Index;
