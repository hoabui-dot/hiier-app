import React from 'react';

export interface DetailInformationProps {
  route: any;
}

const DetailInformation = ({ route }: DetailInformationProps) => {
  const { hiierInformation } = route.params;
  console.log("🚀 ~ file: index.tsx:9 ~ DetailInformation ~ hiierInformation:", hiierInformation)

  return <></>;
};

export default DetailInformation;
