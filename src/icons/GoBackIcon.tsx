interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: string | number;
}

export default function GoBackIcon(props: IconProps) {
  const { size, ...svgProps } = props;
  const computedSize = size || '24';
  return (
    <svg
      width={computedSize}
      height={computedSize}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      {...svgProps}
    >
      <path
        d='m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z'
        fill='currentColor'
      />
    </svg>
  );
}
