import React from 'react';
import { Spin, Icon } from 'antd';

const Loading = () => {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  return (
    <div>
      <Spin indicator={antIcon} />
    </div>
  );
};

const Err = () => {
  return (
    <div>
      <img src="https://www.contabilalianca.com/img/error.png" alt="" />
    </div>
  );
};

export { Loading, Err };
