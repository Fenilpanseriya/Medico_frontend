import { Button, Stack, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { doctorProfileItems, menuItems } from "./profileMenuItems";
import { FaBars } from "react-icons/fa";
import {
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import "../../App.css";
import account from "../../assets/account.png"
import { Link } from "react-router-dom";

const ProfileSidebar = ({ status }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  function handleResize(event) {
    event.preventDefault();
    let width = window.innerWidth;
    if (width <= 430) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Stack
      spacing={"1rem"}
      
      className={!isMobile ? "main-sidebar-stack":"sidebar-container"}
      
    >
      {!isMobile ? (
        <Box className="profile-sidebar">
          {(localStorage.getItem("role")==="user"?menuItems:doctorProfileItems).map((item, index) => {
            return (
              <Link to={`/${item}`}>
              <Button
                width={"100%"}
                key={index}
                variant={"ghost"}
                color={"blue.600"}
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251, 0.8)" }}
                style={{ textDecoration: "link", padding: "0.7rem" }}
              >
                {item}
              </Button>
              </Link>
            );
          })}
        </Box>
      ) : (
        <Stack spacing={4} height={"min-content"} width={"min-content"} left={0} background={"transparent"}>
          <IconButton
            aria-label="Open menu"
            icon={<FaBars />}
            onClick={toggleDrawer}
            background={"transparent"}
            
          />

          <Drawer placement="top" onClose={toggleDrawer} isOpen={isOpen}  >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Activity</DrawerHeader>
              <DrawerBody>
                <Stack spacing={4}>
                  {(localStorage.getItem("role")==="user"?menuItems:doctorProfileItems).map((item, index) => {
                    return (
                      <Link to={`/${item}`}>
                      <Button
                        width={"100%"}
                        key={index}
                        variant={"ghost"}
                        color={"blue.600"}
                        _hover={{
                          borderBottom: "2px solid rgba(126, 159, 251, 0.8)",
                        }}
                        style={{ textDecoration: "link", padding: "0.7rem" }}
                      >
                        {item}
                      </Button>
                      </Link>
                    );
                  })}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Stack>
      )}
    </Stack>
  );
};

export default ProfileSidebar;
