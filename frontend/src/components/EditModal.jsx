import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import React, { useState } from "react";
import { BASE_URL } from "../App";

const EditModal = ({ user, setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
  });
  const toast = useToast();

  const handleEditModal = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? data : u))
      );
      toast({
        title: "Congrats 🎉.",
        description: "Friend updated successfully.",
        status: "success",
        duration: 2000,
        position: "top",
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onOpen}>
        <CiEdit size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleEditModal}>
          <ModalContent>
            <ModalHeader>My new BFF😍</ModalHeader>
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, role: e.target.value }))
                    }
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He is a software engineer who loves to code and build things"
                  value={inputs.description}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></Textarea>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
