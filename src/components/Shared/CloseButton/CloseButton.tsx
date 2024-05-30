interface CloseButtonProps {
  onClick?: () => void;
}
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>close</button>;
};

export default CloseButton;
