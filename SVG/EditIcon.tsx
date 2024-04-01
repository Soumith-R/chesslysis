import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function EditIcon(props: SvgProps) {
  return (
    <Svg width={19} height={21} viewBox='0 0 19 21' fill='none' {...props}>
      <Path
        d='M17.54 1.811h0l.179.19s0 0 0 0c1.041 1.096 1.041 2.884 0 3.98l.362.344-.362-.344-1.817 1.912-10.297 10.84s0 0 0 0a.534.534 0 01-.25.15l-4.183 1.1a.511.511 0 01-.503-.15.64.64 0 01-.151-.585l1.045-4.403s0 0 0 0a.617.617 0 01.151-.282s0 0 0 0L12.072 3.66l1.756-1.849a2.527 2.527 0 013.711 0zm-.575 3.302l-.362-.344.362.344a1.642 1.642 0 000-2.245h0l-.18-.189s0 0 0 0a1.509 1.509 0 00-2.203 0l-1.031 1.086-.321.337.314.344 1.627 1.78.362.395.37-.389 1.062-1.119zM14.423 7.79l.321-.338-.314-.344-1.627-1.779-.362-.396-.37.39-9.398 9.893-.093.098-.031.131-.553 2.327-.193.811.807-.212 2.21-.582.138-.036.098-.103 9.367-9.86z'
        fill='#B6BBC4'
        stroke='#B6BBC4'
      />
    </Svg>
  );
}

export default EditIcon;
