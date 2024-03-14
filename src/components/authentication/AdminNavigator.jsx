import React from "react";
import { Link } from "react-router-dom";
import { Button, VStack } from "@chakra-ui/react";
const AdminNavigator= () => {
  return (
    <VStack spacing={"0"} mt="1rem">
        <p style={{ color: "black", fontWeight: "bold" }}>Are you Admin? </p>
        <Link to={"/admin-login"}>
            <Button variant={"link"} padding={"0.25rem"}>
                Login Here
            </Button>
        </Link>
    </VStack>
  );
};

export default AdminNavigator;
