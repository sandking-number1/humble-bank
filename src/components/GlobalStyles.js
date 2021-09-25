import { StyleSheet } from 'react-native';

const font = StyleSheet.create({
  primary: { fontSize: 12, color: '#60708F', fontWeight: '700' },
  date: {
    fontSize: 12,
    color: '#BBBFC9',
    fontWeight: '700',
    // placeholderTextColor: '#8B98B1',
  },
  searchBarPlaceholder: {
    fontSize: 16,
    color: '#BBBFC9',
    fontWeight: 'normal',
  },
});

const transList = StyleSheet.create({ descriptionBox: {} });

export { font, transList };
