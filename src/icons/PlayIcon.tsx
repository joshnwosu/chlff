interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: string | number;
}

export default function PlayIcon(props: IconProps) {
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
        d='M17.49 9.59965L5.6 16.7696C4.9 17.1896 4 16.6896 4 15.8696V7.86965C4 4.37965 7.77 2.19965 10.8 3.93965L15.39 6.57965L17.48 7.77965C18.17 8.18965 18.18 9.18965 17.49 9.59965Z'
        fill='currentColor'
      />
      <path
        d='M18.0888 15.4606L14.0388 17.8006L9.99883 20.1306C8.54883 20.9606 6.90883 20.7906 5.71883 19.9506C5.13883 19.5506 5.20883 18.6606 5.81883 18.3006L18.5288 10.6806C19.1288 10.3206 19.9188 10.6606 20.0288 11.3506C20.2788 12.9006 19.6388 14.5706 18.0888 15.4606Z'
        fill='currentColor'
      />
    </svg>
  );
}
