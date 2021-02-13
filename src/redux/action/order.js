import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

export const getOrders = () => (dispatch) => {
  getData('token').then((resToken) => {
    Axios.get(`${API_HOST.url}/transaction`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then((res) => {
        dispatch({type: 'SET_ORDER', value: res.data.data.data});
      })
      .catch((err) => {
        showMessage(
          `${err?.response?.data?.message} on Food API` ||
            'Terjadi kesalahan di API Food',
        );
      });
  });
};

export const getInProgress = () => (dispatch) => {
  getData('token').then((resToken) => {
    Axios.all([
      Axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
    ])
      .then(
        Axios.spread((res1, res2, res3) => {
          const pending = res1.data.data.data
          const success = res2.data.data.data
          const onDelivery = res3.data.data.data
          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...pending, ...success, ...onDelivery],
          })
        }),
      )
      .catch((err) => {
        showMessage(
          `${err?.response?.data?.message} on Food API` ||
            'Terjadi kesalahan di API Food',
        )
      })
  })
}

// export const getPastOrders = () => (dispatch) => {
//   getData('token').then((resToken) => {
//     Axios.all([
//         Axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
//           headers: {
//             Authorization: resToken.value,
//       },
//     }),
//       Axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
//         headers: {
//           Authorization: resToken.value,
//       },
//     })
//     ])
//       .then(Axios.spread((res1,res2) => {
//         console.log('get Post Orders 1 : ', res1.data);
//         console.log('get Post Orders 2 : ', res2.data);
//         const cancelled = res1.data.data.data;
//         const delvered = res2.data.data.data;
//         dispatch({type: 'SET_POST_ORDERS', value: [...cancelled,...delivered]});
//       }),
//       )
//       .catch((err) => {
//         console.log('err Post Orders: ', err.response);
//       });
//   });
// };

export const getPastOrders = () => (dispatch) => {
  getData('token').then((resToken) => {
    Axios.all([
      Axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
    ])
      .then(
        Axios.spread((res1, res2) => {
          const cancelled = res1.data.data.data
          const delivered = res2.data.data.data
          dispatch({
            type: 'SET_PAST_ORDERS',
            value: [...cancelled, ...delivered],
          })
        }),
      )
      .catch((err) => {
        showMessage(
          `${err?.response?.data?.message} on Food API` ||
            'Terjadi kesalahan di API Food',
        )
      })
  })
}
