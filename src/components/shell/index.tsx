"use client";

import { ActionIcon, AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandGithub } from "@tabler/icons-react";
import { ShellLogo } from "~/components/shell/logo";
import { ShellNavbar } from "~/components/shell/navbar";

interface ShellProperties {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProperties) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" pr="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <ShellLogo />
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://github.com/mkvlrn/desafio-noleak"
              target="_blank"
            >
              <IconBrandGithub />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ShellNavbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
