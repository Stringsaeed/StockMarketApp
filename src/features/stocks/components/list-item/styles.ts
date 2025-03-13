import {StyleSheet} from 'react-native';

export const listItemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    // alignItems: 'center',
    gap: 8,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderRadius: 35,
    borderWidth: 1,
    height: 35,
    padding: 2,
    width: 35,
  },
  ticker: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    textAlign: 'left',
    color: '#e0e0e0',
    marginRight: 10,
    fontSize: 12,
  },
  name: {
    fontFamily: 'DM Sans',
    textAlign: 'left',
    color: '#e0e0e0',
    opacity: 0.7,
    flex: 1,
  },
  avatarText: {
    fontFamily: 'DM Sans',
    fontWeight: '700',
    color: '#fff',
    fontSize: 10,
  },
  evenContainer: {
    marginRight: 12,
  },
});
