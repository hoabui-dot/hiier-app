import React from 'react';
import { View, Text } from 'react-native';
import Card from '../Card';

const CardWithContent = ({
  title,
  description,
}: {
  title: string;
  description: any;
}) => {
  return (
    <Card cardStyle={{ marginTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', marginRight: 10 }}>{title}</Text>
        <Text style={{ flex: 1 }}>{description}</Text>
      </View>
    </Card>
  );
};

export default CardWithContent;
