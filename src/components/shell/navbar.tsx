import { Group, NavLink } from "@mantine/core";
import { IconArrowRight, IconDatabase, IconMap } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkProperties {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const links: LinkProperties[] = [
  {
    href: "/",
    icon: <IconMap />,
    label: "Novo heatmap",
  },
  {
    href: "/heatmaps",
    icon: <IconDatabase />,
    label: "Banco de heatmaps",
  },
];

export function ShellNavbar() {
  const pathname = usePathname();

  return (
    <Group>
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          component={Link}
          leftSection={link.icon}
          rightSection={pathname === link.href ? <IconArrowRight /> : undefined}
          active={pathname === link.href}
        />
      ))}
    </Group>
  );
}
