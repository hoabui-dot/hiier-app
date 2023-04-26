import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';

const JobModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible}>
      <View>
        <TouchableOpacity
          onPress={() => setIsVisible(false)}
        ></TouchableOpacity>
      </View>
    </Modal>
  );
};

export default JobModal;
