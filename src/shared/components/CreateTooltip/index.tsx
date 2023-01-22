import React from 'react';
import Tooltip from '../Tooltip/Tooltip';

export const CreateTooltip = (props: any) => {
  return (
    <Tooltip
      width={200}
      {...props}
      renderContent={() => (<div>test</div>)}
    />
  );
};
