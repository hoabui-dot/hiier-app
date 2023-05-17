import React from 'react';

export interface DetailInformationProps {
  route: any;
}

const DetailInformation = ({ route }: DetailInformationProps) => {
  const { hiierInformation } = route.params;

  return <></>;
};

export default DetailInformation;
