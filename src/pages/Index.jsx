import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Stack, Text, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [sourceList, setSourceList] = useState("");
  const [targetList, setTargetList] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [formula, setFormula] = useState("");
  const toast = useToast();

  // Dummy function to simulate formula search
  const findFormula = () => {
    setIsSearching(true);
    setTimeout(() => {
      // For demonstration, we pretend that the formula is always 'x * 2'
      setFormula("x * 2");
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
        {formula && (
          <Box>
            <Heading as="h3" size="md">
              Transformation Formula:
            </Heading>
            <Text as="i">{formula}</Text>
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
