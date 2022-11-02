type BadgeStyle = "primary" | "secondary" | "success";

export function Badge(props: { text: string; badgeStyle?: BadgeStyle }) {
  const defaultProps = { badgeStyle: "primary" } as const;
  const { text, badgeStyle } = { ...defaultProps, ...props };

  return <span className={`badge bg-${badgeStyle}`}>{text}</span>;
}
