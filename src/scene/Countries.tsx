import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Placeholder, Fade, PlaceholderLine } from 'rn-placeholder';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

import { Colors } from '~/src/themes';
import { Text } from '~/src/components/Text';

import { api } from '~/src/api';
import { Apis } from '~/src/common/apis';
import { Formatter } from '~/src/utils';
import Flag from 'react-native-flags';
import { Header } from 'react-navigation-stack';

import { CaseCountries } from '~/src/model';

const BORDER_SIZE = 2;

const { HEIGHT }: any = Header;

const HEADER_HEIGHT = HEIGHT;

const listSkeleton = [{}, {}, {}, {}] as any;

const Countries = observer(props => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCountries(props.navigation.getParam('countries'));
    setIsLoading(false);
  }, [props.navigation]);

  const _handleRefresh = () => {
    setIsLoading(true);
    api
      .get(Apis.paths.summary)
      .then(response => {
        setIsLoading(false);
        if (response.status === 200) {
          setCountries(response.data.Countries);
        } else {
          Alert.alert('Please try again later');
        }
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Please try again later');
      });
  };

  const _renderItemSkeleton = () => {
    return (
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        <Placeholder Animation={Fade}>
          <PlaceholderLine width={80} />
          <PlaceholderLine />
          <PlaceholderLine width={30} />
        </Placeholder>
      </View>
    );
  };

  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 16,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            flex: 0.4,
          }}>
          <Flag code={item.CountryCode} size={32} />
          <Text
            style={{ flex: 1, marginLeft: 14 }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.Country}
          </Text>
        </View>
        <View>
          <View
            style={{
              width: BORDER_SIZE,
              backgroundColor: Colors.PRIMARY,
              flex: 1,
            }}
          />
        </View>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: 14,
            paddingVertical: 14,
            flex: 0.2,
            textAlign: 'center',
            color: Colors.ACTIVE,
          }}>
          {item.TotalConfirmed !== 0
            ? Formatter.formatComma(item.TotalConfirmed)
            : 'Unreported'}
        </Text>
        <View>
          <View
            style={{
              width: BORDER_SIZE,
              backgroundColor: Colors.PRIMARY,
              flex: 1,
            }}
          />
        </View>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: 14,
            paddingVertical: 14,
            flex: 0.2,
            textAlign: 'center',
            color: Colors.DEATHS,
          }}>
          {item.TotalDeaths !== 0
            ? Formatter.formatComma(item.TotalDeaths)
            : 'Unreported'}
        </Text>
        <View>
          <View
            style={{
              width: BORDER_SIZE,
              backgroundColor: Colors.PRIMARY,
              flex: 1,
            }}
          />
        </View>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{
            fontSize: 14,
            paddingVertical: 14,
            flex: 0.2,
            textAlign: 'center',
            color: Colors.RECOVED,
          }}>
          {item.TotalRecovered !== 0
            ? Formatter.formatComma(item.TotalRecovered)
            : 'Unreported'}
        </Text>
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View style={{ backgroundColor: Colors.WHITE }}>
        <Text
          style={{
            flex: 1,
            marginHorizontal: 16,
            marginBottom: 4,
            color: Colors.PRIMARY,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Statistics ({getData().length} Countries)
        </Text>
        <View
          style={{
            height: BORDER_SIZE,
            backgroundColor: Colors.PRIMARY,
            marginHorizontal: 16,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: 14,
              flex: 0.4,
              fontWeight: 'bold',
            }}>
            {'Location'}
          </Text>
          <View>
            <View
              style={{
                width: BORDER_SIZE,
                backgroundColor: Colors.PRIMARY,
                flex: 1,
              }}
            />
          </View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 16,
              paddingVertical: 14,
              flex: 0.2,
              textAlign: 'center',
              fontWeight: 'bold',
              color: Colors.ACTIVE,
            }}>
            {'Active'}
          </Text>
          <View>
            <View
              style={{
                width: BORDER_SIZE,
                backgroundColor: Colors.PRIMARY,
                flex: 1,
              }}
            />
          </View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 16,
              paddingVertical: 14,
              flex: 0.2,
              textAlign: 'center',
              fontWeight: 'bold',
              color: Colors.DEATHS,
            }}>
            {'Deaths'}
          </Text>
          <View>
            <View
              style={{
                width: BORDER_SIZE,
                backgroundColor: Colors.PRIMARY,
                flex: 1,
              }}
            />
          </View>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 16,
              paddingVertical: 14,
              flex: 0.2,
              textAlign: 'center',
              fontWeight: 'bold',
              color: Colors.RECOVED,
            }}>
            {'Recoved'}
          </Text>
        </View>
      </View>
    );
  };

  const _clearSearchValue = () => {
    setSearchValue('');
  };

  const getData = (): CaseCountries[] => {
    const _list = searchValue
      ? countries.filter((item: CaseCountries) =>
          item.Country.toLowerCase().includes(searchValue.toLowerCase()),
        )
      : countries;
    return _.orderBy(
      _list,
      ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'],
      ['desc', 'desc', 'desc'],
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingTop: HEADER_HEIGHT,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          backgroundColor: Colors.PRIMARY_TRANSPARENT,
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 8,
        }}>
        <Image
          source={require('~/src/assets/images/ic_search.png')}
          resizeMode={'stretch'}
          style={{ width: 24, height: 24, marginRight: 16 }}
        />
        <TextInput
          style={{
            padding: 8,
            flex: 1,
            fontFamily: 'Sukhumvit Set',
            fontSize: 16,
          }}
          placeholder={'Search'}
          placeholderTextColor={Colors.WHITE}
          onChangeText={setSearchValue}
          value={searchValue}
        />
        {searchValue ? (
          <TouchableOpacity onPress={_clearSearchValue}>
            <Image
              source={require('~/src/assets/images/ic_close.png')}
              resizeMode={'stretch'}
              style={{ width: 24, height: 24, marginLeft: 16 }}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        <FlatList
          keyExtractor={item => item.ID}
          style={{ flex: 1 }}
          data={isLoading ? listSkeleton : getData()}
          renderItem={isLoading ? _renderItemSkeleton : _renderItem}
          ListHeaderComponent={_renderHeader}
          stickyHeaderIndices={[0]}
          refreshing={false}
          onRefresh={_handleRefresh}
          removeClippedSubviews={true}
          initialNumToRender={50}
          windowSize={50}
          maxToRenderPerBatch={50}
        />
      </View>
    </View>
  );
});

export default inject('navigation')(Countries);
