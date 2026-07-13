/** Itens do menu principal, na ordem em que aparecem. */
export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "PPF", href: "/ppf" },
  { label: "Limpeza", href: "/limpeza" },
  { label: "Películas", href: "/peliculas" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Contato", href: "/#contato" },
];
