export function PrimaryButton({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {text}
    </button>
  );
}
