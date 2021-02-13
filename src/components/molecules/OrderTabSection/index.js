import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import ItemListFood from '../ItemListFood';
import {getInProgress, getPastOrders} from '../../../redux/action';
import {useDispatch, useSelector} from 'react-redux';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
      width: '15%',
      marginLeft: '3%',
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{
      width: 'auto',
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getInProgress());
  }, []);

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {inProgress.map((order) => {
        return (
          <ItemListFood
            key={order.id}
            image={{ uri: order.food.picturePath }}
            onPress={() => navigation.navigate('OrderDetail', order)}
            items={order.quantity}
            price={order.total}
            type="in-progress"
            name={order.food.name}
          />
        );
      })}
    </View>
  );
};

const PastOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastOrders} = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getPastOrders());
  }, []);

  console.log('data Past Order :', pastOrders);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {pastOrders.map((order) => {
        return (
          <ItemListFood
            key={order.id}
            image={{ uri: order.food.picturePath }}
            onPress={() => navigation.navigate('OrderDetail', order)}
            items={order.quantity}
            price={order.total}
            type="past-orders"
            name={order.food.name}
            date={order.created_at}
            status={order.status}
          />
        );
      })}
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const OrderTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Past Orders'},
  ]);

  const renderScene = SceneMap({
    1: InProgress,
    2: PastOrders,
  });
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{backgroundCOlor: 'white'}}
    />
  );
};

export default OrderTabSection;
