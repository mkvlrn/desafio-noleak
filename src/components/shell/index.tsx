"use client";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <ShellLogo />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ShellNavbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
