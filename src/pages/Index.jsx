import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Stack, Text, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [sourceList, setSourceList] = useState("");
  const [targetList, setTargetList] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [formulas, setFormulas] = useState([]);
  const toast = useToast();

  // Dummy function to simulate formula search
  const findFormula = () => {
    setIsSearching(true);
    setTimeout(() => {
      // Simulate finding actual transformable formulas based on the source list
      const sourceLength = sourceList.split(",").length;
      const evenFormulas = ["x * 2", "x + 2"];
      const oddFormulas = ["2x - 1", "sin(x)", "cos(x)", "x^2", "e^x"];
      setFormulas(sourceLength % 2 === 0 ? evenFormulas : oddFormulas);
      setIsSearching(false);
      toast({
        title: "Formula found.",
        description: "We've calculated the formula for the transformation.",
        status: "success",
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
