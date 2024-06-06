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
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });
  const toast = useToast();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        title: "Yayy! 🎉.",
        description: "Friend created successfully.",
        status: "success",
        duration: 2000,
        position: "top",
      });
      onClose();
      setUsers((prevUsers) => [...prevUsers, data]);
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error.",
        description: "something went wrong.",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateUser}>
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
                      setInputs({ ...inputs, name: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs({ ...inputs, role: e.target.value })
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
                    setInputs({ ...inputs, description: e.target.value })
                  }
                ></Textarea>
              </FormControl>
              <RadioGroup mt={4}>
                <Flex gap={5}>
                  <Radio
                    value="male"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                  >
                    Female
                  </Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
