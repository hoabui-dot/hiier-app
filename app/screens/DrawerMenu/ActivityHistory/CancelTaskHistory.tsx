import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TASK_STATUS } from '../../../../constants/ui';
import { TaskApi } from '../../../../services/api/task';
import Card from '../../../../components/Card';
import { ICanceledTaskHistory } from '../../../../types/ui';
import { ITheme, useTheme } from 'native-base';

const CancelTaskHistory = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);
  const [data, setData] = useState<ICanceledTaskHistory[]>([]);
  useEffect(() => {
    async function getJobHistory() {
      await TaskApi.listForEmployee({
        status: TASK_STATUS.CANCELED,
        page: 0,
        size: 20,
      }).then((response) => setData(response.data.resource.list || []));
    }
    getJobHistory();
  }, []);

  return (
    <SafeAreaView>
      {data.map((task) => (
        <Card cardStyle={{ flexDirection: 'column', margin: 10, padding: 20 }}>
          <View>
            <Text style={styles.title}>{task.serviceName}</Text>
          </View>
          <View style={styles.informationJob}>
            <Text style={{ marginRight: 8 }}>Kết thúc vào:</Text>
            <Text style={[styles.violetBoldText, styles.violetFontSize]}>
              {(new Date(task.canceledTime)).toLocaleString()}
            </Text>
          </View>
          <View style={styles.informationJob}>
            <Text style={{ marginRight: 8 }}>Tổng tiền:</Text>
            <Text style={[styles.violetBoldText, styles.violetFontSize]}>
              {task.totalPrice}
            </Text>
          </View>
          <View style={styles.informationJob}>
            <Text style={{ marginRight: 8 }}>Tên:</Text>
            <Text style={[styles.violetBoldText, styles.violetFontSize]}>
              {task.address.customerName}
            </Text>
          </View>
          <View style={styles.informationJob}>
            <Text style={{ marginRight: 8 }}>Tại:</Text>
            <Text style={[styles.violetBoldText, styles.violetFontSize]}>
              {task.address.detail}
            </Text>
          </View>
        </Card>
      ))}
    </SafeAreaView>
  );
};

export default CancelTaskHistory;

const makeStyles = ({ colors }: ITheme) =>
  StyleSheet.create({
    title: {
      fontSize: 24,
      textTransform: 'uppercase',
      color: colors.violet[400],
      fontWeight: '500',
    },
    informationJob: {
      flexDirection: 'row',
      marginTop: 10,
      flexWrap: 'wrap',
    },
    violetBoldText: {
      fontWeight: 'bold',
      color: colors.violet[400],
    },
    violetFontSize: {
      fontSize: 16,
    },
  });
