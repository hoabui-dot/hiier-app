import React, { useContext, useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASEURL } from '../../../../services/api/urls';
import io from 'socket.io-client';
import { addAuthorizationHeader } from '../../../../services/token';
import { IJobInformation } from '../../../../types/ui';

import { secretHashContext } from '../../DrawerMenu';

const NewJobTab = () => {
  const [isJobModal, setIsJobModal] = useState<boolean>(true);
  const [jobInformation, setJobInformation] = useState<IJobInformation>();
  const loginCode = useContext(secretHashContext);
  addAuthorizationHeader(loginCode.token);
  const socket = io(BASEURL);

  useEffect(() => {
    if (loginCode.secretHash) {
      socket.emit('subscribe', loginCode.secretHash);
      socket.on('subscribe/' + loginCode.secretHash, async (res) => {
        console.log('subscribe', res);
      });
      socket.on('private/' + loginCode.secretHash, async (res) => {
        console.log('private', res);
        setJobInformation(res);
        setIsJobModal(true);
      });

      return () => {
        socket.off('private/' + loginCode.secretHash);
        socket.off('subscribe/' + loginCode.secretHash);
      };
    }
    return () => {};
  }, [socket]);

  return (
    <SafeAreaView>
      <View style={{ display: 'flex' }}>
        <Text>Hiện tại chưa có công việc mới, vui lòng quay lại sau</Text>
      </View>
      {/* <Modal visible={isJobModal}><Text>asdsadsa</Text></Modal> */}
    </SafeAreaView>
  );
};

export default NewJobTab;
