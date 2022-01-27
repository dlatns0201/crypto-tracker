import React from 'react';

interface Props {
  SVGComponent: React.FunctionComponent;
  alterText?: string;
  className?: string;
}

function Icon({ SVGComponent, alterText, className }: Props) {
  return (
    <div className={className ? className : ''}>
      <SVGComponent />
      {alterText && <span className="blind">{alterText}</span>}
    </div>
  );
}

export default Icon;