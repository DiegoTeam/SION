import React, {useEffect, useState} from 'react';
//Libraries
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';
import {ListItem} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
//Utils
import AsyncStorageAPI from '../utils/AsyncStorageAPI';
//Components
import Loading from '../components/Loading';

const LineDetail = ({navigation, route}) => {
  const [line, setLine] = useState({supplies: []});
  const [isLoading, setIsLoading] = useState(false);
  const actions = [
    {
      text: 'Agregar insumos',
      color: '#3B666F',
      icon: <Icon name="add-circle" size={24} color="white" />,
      name: 'add_supple',
      position: 1,
    },
  ];
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await AsyncStorageAPI.getLine(
        route.params.index,
        route.params.indexLine,
      );
      setLine(response);
      setIsLoading(false);
    }
    fetchData();
    return navigation.addListener('focus', () => {
      fetchData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <ScrollView>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Nombre:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {line.name}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Numero de hogares:
          </Text>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {line.homes}
          </Text>
          <NumberFormat
            renderText={text => (
              <>
                <Text
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#88959E',
                  }}>
                  Presupuesto IRACA:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <Icon name="monetization-on" size={30} color="black" />
                  <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
                </View>
              </>
            )}
            value={line.budgetIRACA}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
          <NumberFormat
            renderText={text => (
              <>
                <Text
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#88959E',
                  }}>
                  Presupuesto IRACA utilizado:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <Icon name="monetization-on" size={30} color="black" />
                  <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
                </View>
              </>
            )}
            value={line.budgetIRACAUsed}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
          <NumberFormat
            renderText={text => (
              <>
                <Text
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#88959E',
                  }}>
                  Presupuesto IRACA disponible:
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <Icon name="monetization-on" size={30} color="black" />
                  <Text style={{fontSize: 17, marginLeft: 15}}>{text}</Text>
                </View>
              </>
            )}
            value={line.budgetIRACAAvailable}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
          <Text
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 17,
              color: '#88959E',
            }}>
            Insumos:
          </Text>
          <View style={{marginHorizontal: 10}}>
            {line.supplies.length > 0 ? (
              line.supplies.map((item, i) => {
                return (
                  <ListItem
                    key={i}
                    title={item.name}
                    badge={{
                      value: item.count.countIRACA,
                    }}
                    subtitle={
                      <NumberFormat
                        value={item.price * item.count.countIRACA}
                        renderText={value => <Text>{value}</Text>}
                        thousandSeparator={true}
                        displayType={'text'}
                        prefix={'$'}
                      />
                    }
                    onPress={() => {
                      navigation.navigate('EditSupplies', {
                        line: line,
                        index: route.params.index,
                        indexLine: route.params.indexLine,
                        projectType: route.params.projectType,
                        indexSupple: i,
                        supple: item,
                      });
                    }}
                    bottomDivider
                  />
                );
              })
            ) : (
              <ListItem title={'No hay insumos en esta linea'} />
            )}
          </View>
        </View>
      </ScrollView>
      <FloatingAction
        actions={actions}
        color="#3B666F"
        onPressItem={() => {
          navigation.navigate('AddSupplies', {
            index: route.params.index,
            indexLine: route.params.indexLine,
            line: line,
            projectType: route.params.projectType,
          });
        }}
      />
    </>
  );
};

export default LineDetail;
