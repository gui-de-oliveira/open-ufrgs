export function PrimaryButton({
  onClick,
  text,
  isDisabled,
}: {
  onClick: () => void;
  text: string;
  isDisabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
