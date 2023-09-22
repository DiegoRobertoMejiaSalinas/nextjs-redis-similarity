interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <section className="pt-20">{children}</section>;
}
