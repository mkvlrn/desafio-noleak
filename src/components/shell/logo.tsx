import { Center, Flex, Text } from "@mantine/core";

export function ShellLogo() {
  return (
    <Center inline h={60}>
      <Flex align="center" gap={5} ml={10}>
        <Text fw={700} size="lg">
          desafio-noleak
        </Text>
        <Text fw={500} c="teal" size="lg">
          mkvlrn@gmail.com
        </Text>
      </Flex>
    </Center>
  );
}
