import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {EmptyOrder,Header,OrderTabSection} from '../../components';
import {getOrders} from '../../redux/action';
import {useDispatch, useSelector} from 'react-redux';

const Order = () => {
    const [isEmpty] = useState(false);
    const dispatch = useDispatch();
    const {orders} = useSelector(state => state.orderReducer);

    useEffect(() => {
      dispatch(getOrders());
    }, [dispatch]);

    console.log(' List Orders: ', orders);
  return (
    <View style={styles.page}>
      {orders.length < 1 ? (
        <EmptyOrder />
      ) : (
        <View style={styles.content}>
          <Header title="Your Orders" subTitle="Wait for the best meal" />
          <View style={styles.tabContainer}>
            <OrderTabSection />
          </View>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: {flex: 1},
  content: {flex: 1},
  tabContainer: {flex: 1, marginTop: 24},
});
