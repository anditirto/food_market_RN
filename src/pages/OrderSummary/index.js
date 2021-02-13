import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import {Header, ItemListFood, ItemValue} from '../../components';
import Axios from 'axios';
import {getData} from '../../utils';
import {API_HOST} from '../../config';
import {WebView} from 'react-native-webview';
import {Loading} from '../../components';

const OrderSummary = ({navigation, route}) => {
  const {item, transaction, userProfile} = route.params;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentURL, setPaymentURL] = useState('https://google.com');

  const onCheckout = () => {
    const data = {
      food_id: item.id,
      user_id: userProfile.id,
      quantity: transaction.totalItem,
      total: transaction.total,
      status: 'PENDING',
    };
    getData('token').then((resToken) => {
      Axios.post(`${API_HOST.url}/checkout`, data, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then((res) => {
          console.log('Checkout Sukses :', res);
          setIsPaymentOpen(true);
          setPaymentURL(res.data.data.payment_url);
        })
        .then((err) => {
          console.log('Checkout Error :', err);
        });
    });
  };

  const onNavChange = (state) => {
    console.log('nav :', state);
    const urlSuccess =
      'http://foodmarket-backend.buildwithangga.id/midtrans/success?order_id=1991&status_code=201&transaction_status=pending';
    const titleWeb = 'Laravel';
    if (state.title === titleWeb) {
      navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]});
    }
  };

  if (isPaymentOpen) {
    return (
      <>
        <Header
          title="Payment"
          subTitle="you Deserve A better Meal"
          onBack={() => setIsPaymentOpen(false)}
        />
        <WebView
          source={{uri: paymentURL}}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
          onNavigationStateChange={onNavChange}
        />
      </>
    );
  }

  return (
    <ScrollView>
      <Header
        title="Order Summary"
        subTitle="you Deserve A better Meal"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ItemListFood
          image={{uri: item.picturePath}}
          type="order-summary"
          name={item.name}
          price={item.price}
          items={transaction.totalItem}
        />
        <Text style={styles.label}>Detail Transaction</Text>
        <ItemValue
          label={item.name}
          value={transaction.totalPrice}
          type="curenncy"
        />
        <ItemValue label="Driver" value={transaction.driver} type="curenncy" />
        <ItemValue label="Tax" value={transaction.tax} type="curenncy" />
        <ItemValue label="Total" value={transaction.total} type="curenncy" />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver To:</Text>
        <ItemValue label="Name" value={userProfile.name} />
        <ItemValue label="Phone No" value={userProfile.phoneNumber} />
        <ItemValue label="Address" value={userProfile.address} />
        <ItemValue label="House No" value={userProfile.houseNumber} />
        <ItemValue label="City" value={userProfile.city} />
      </View>

      <View style={styles.button}>
        <Button title="Checkout Now" onPress={onCheckout} />
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 8,
  },
  button: {paddingHorizontal: 24, marginTop: 24},
});
