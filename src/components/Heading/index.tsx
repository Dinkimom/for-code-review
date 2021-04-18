import React from 'react'

export enum TitleSize {
  s = 'h5',
  m = 'h4',
  l = 'h3',
  xl = 'h2',
  xxl = 'h1'
}

interface HeadingInterface {
  tag: TitleSize,
  className?: string
  children: (string | number | false | null) | (string | number | false | null)[]
}

const Heading: React.FC<HeadingInterface> = (props) => {
  const { tag, children } = props;
  return (
    React.createElement(tag, {...props}, children)
  )
}

export default React.memo(Heading);
