"use client";

import { Center, Title } from "@mantine/core";

interface PageTitleProperties {
  title: string;
}

export function PageTitle({ title }: PageTitleProperties) {
  return (
    <Center mb="lg">
      <Title order={1}>{title}</Title>
    </Center>
  );
}
