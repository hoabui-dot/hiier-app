import { Icon, ITheme, useTheme } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { TRANSACTION_HISTORY_TYPE } from "../../constants/ui";
import { TaskApi } from "../../services/api/task";
import { ITransactionHistory } from "../../types/ui";
import Icons from "../../utils/Icon/Icons";

const Transfer = () => {
  const [data, setData] = useState<ITransactionHistory[]>([]);
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), []);

  useEffect(() => {
    async function getTransactionHistory () {
      TaskApi.getTransactionHistory()
      .then((response) => {
        setData(response.data?.resource || []);
      })
      .catch((err) => {
        console.log('🚀 ~ file: Trading.tsx:26 ~ useEffect ~ err:', err);
      });
    }

    getTransactionHistory()
  }, []);
  return (
    <ScrollView style={styles.container}>
      {data.map((history) => (
        <View style={styles.transaction}>
          <View style={styles.content}>
            <View>
              <Icon
                as={Icons.Coin}
                color={
                  history.type === TRANSACTION_HISTORY_TYPE.TOP_UP
                    ? 'violet.500'
                    : 'gray.400'
                }
                size={10}
              />
            </View>
            <View style={styles.description}>
              <Text style={styles.boldText}>{history.content}</Text>
              <Text style={styles.thinText}>
                {new Date(history.time).toLocaleString()}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.amount}>
              {TRANSACTION_HISTORY_TYPE.TOP_UP
                ? `+${history.amount.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}`
                : `-${history.amount.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}`}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

export default Transfer;

const makeStyles = ({ colors, sizes, fontSizes }: ITheme) =>
  StyleSheet.create({
    container: {
      margin: 10,
    },
    boldText: {
      fontSize: 14,
      fontWeight: 'bold',
      width: 160,
    },
    thinText: {
      fontSize: 12,
      fontWeight: '200',
    },
    content: {
      flexDirection: 'row',
    },
    description: {
      marginLeft: 10,
      justifyContent: 'center',
    },
    transaction: {
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    amount: {
      fontWeight: '800',
      color: colors.green[500]
    }
  });
