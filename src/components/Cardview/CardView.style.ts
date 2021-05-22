import { Platform } from '~/src/utils';

export const styles = {
  container: [
    {
      ...Platform.select({
        ios: {
          shadowColor: 'rgba(0,0,0,0.2)',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 1,
          shadowRadius: 1,
        },
        android: {
          elevation: 3,
        },
      }),
    },
  ],
};
