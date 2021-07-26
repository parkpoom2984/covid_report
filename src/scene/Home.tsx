import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { Colors } from '~/src/themes';
import { Text } from '~/src/components/Text';
import { CardView } from '../components/Cardview';
import { api } from '~/src/api';
import { Apis } from '~/src/common/apis';
import { Formatter, DatetimeUtils } from '~/src/utils';
import { route } from '~/src/common/navigate';
import { CaseGlobal } from '~/src/model';
import { Placeholder, Fade, PlaceholderLine } from 'rn-placeholder';
import env from 'react-native-config';

const { width: _width, height: _height } = Dimensions.get('window');
const HEIGHT_MAIN_IMAGE = _height / 3;

interface ICardGlobal {
  title: string;
  value: number;
  backgroundColor: string;
  isPlus?: boolean;
}

const CardGlobal = ({ title, value, backgroundColor, isPlus }: ICardGlobal) => {
  return value ? (
    <CardView
      style={{
        flex: 0.5,
        backgroundColor,
        borderRadius: 8,
        marginHorizontal: 8,
        padding: 16,
      }}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          marginTop: 16,
          fontSize: 24,
          color: 'white',
          fontWeight: 'bold',
        }}>
        {isPlus ? '+' : ''}
        {Formatter.formatComma(value)}
      </Text>
    </CardView>
  ) : (
    <Placeholder style={{ flex: 0.5, marginHorizontal: 8 }} Animation={Fade}>
      <PlaceholderLine height={16} />
      <PlaceholderLine height={16} />
    </Placeholder>
  );
};

const Home = observer(() => {
  useEffect(() => {
    getSummary();
  }, []);

  const [global, setGlobal] = useState({} as CaseGlobal);
  const [countries, setCountries] = useState([] as Array<CaseGlobal>);

  const _goToCountries = () => {
    route('Countries', { countries, fetchDate: global.Date });
  };

  const getSummary = () => {
    api
      .get(Apis.paths.summary)
      .then(response => {
        if (response.status === 200) {
          setGlobal(response.data.Global);
          setCountries(response.data.Countries);
        } else {
          Alert.alert('Please try again later');
        }
      })
      .catch(() => {
        Alert.alert('Please try again later');
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View
        style={{
          transform: [{ scaleX: 2 }],
          borderBottomStartRadius: _width,
          borderBottomEndRadius: _width,
          overflow: 'hidden',
        }}>
        <Image
          source={require('~/src/assets/images/main.jpg')}
          resizeMode={'cover'}
          style={{
            height: HEIGHT_MAIN_IMAGE,
            width: _width,
            transform: [{ scaleX: 0.5 }],
          }}
        />
      </View>
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 24,
        }}>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: Colors.PRIMARY,
            }}>
            COVID-19, {env.NAME}
          </Text>
          {global.Date && (
            <Text
              style={{
                fontSize: 14,
                color: Colors.PRIMARY,
                marginTop: 2,
              }}>
              latest {DatetimeUtils.formatFromDatetime(global.Date)}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={_goToCountries}
          style={{
            marginLeft: 24,
            borderColor: '#5F7EEB',
            borderRadius: 16,
            padding: 16,
            borderWidth: 2,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{ fontSize: 14, color: '#5F7EEB', fontWeight: 'bold' }}>
              All Countries
            </Text>
            <Image
              style={{
                width: 24,
                height: 24,
                marginLeft: 16,
                tintColor: '#5F7EEB',
              }}
              source={require('~/src/assets/images/ic_next_arrow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getSummary} />
        }
        style={{ flex: 1, margin: 16 }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <CardGlobal
            backgroundColor={Colors.ACTIVE}
            title={'New Confirmed'}
            value={global.NewConfirmed}
            isPlus={true}
          />
          <CardGlobal
            backgroundColor={Colors.ACTIVE}
            title={'Total Confirmed'}
            value={global.TotalConfirmed}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <CardGlobal
            backgroundColor={Colors.DEATHS}
            title={'New Deaths'}
            value={global.NewDeaths}
            isPlus={true}
          />
          <CardGlobal
            backgroundColor={Colors.DEATHS}
            title={'Total Deaths'}
            value={global.TotalDeaths}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}>
          <CardGlobal
            backgroundColor={Colors.RECOVED}
            title={'New Recovered'}
            value={global.NewRecovered}
            isPlus={true}
          />
          <CardGlobal
            backgroundColor={Colors.RECOVED}
            title={'Total Recovered'}
            value={global.TotalRecovered}
          />
        </View>
      </ScrollView>
    </View>
  );
});

export default inject('navigation')(Home);
