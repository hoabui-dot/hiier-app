import React from "react";
import { StyleSheet, View } from "react-native";

export interface RowBaseProps {
  children: React.ReactNode
}

const Row = ({children}: RowBaseProps) => (
  <View style={styles.row}></View>
)

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
})