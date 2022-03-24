import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Movie from "./Movie";

const Card = ({ title, imageURL, year, description, duration, id, href }) => {
  let imagePath = `https://image.tmdb.org/t/p/w500`;
  return (
    <Box
      display="flex"
      flexDir="column"
      gap={2}
      _hover={{
        transform: "scale(1.1)",
        border: "1px solid white",
        transition: "all 300ms ease-in",
        zIndex: 2,
        cursor: "pointer",
      }}
      as="a"
      href={href}
      maxW={200}
    >
      <Image src={`${imagePath}${imageURL}`} w={200} h={300} />
      <Box>
        <Text>{title}</Text>
      </Box>
    </Box>
  );
};

export default Card;
