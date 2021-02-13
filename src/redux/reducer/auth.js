const initStateRegister = {
    name: '',
    email: '',
    password:'',
    password_confirmation:'',
    address:'',
    city:'',
    houseNumber:'',
    phoneNumber:'',
}

export const registerReducer = (state=initStateRegister, action) => {
    if(action.type === 'SET_REGISTER'){
        return {
            ...state,
            name: action.value.name,
            email: action.value.email,
            password: action.value.password,
            password_confirmation: action.value.password
        }
    }
    // if(action.type === 'SET_ADDRESS'){
    //     return {
    //         ...state,
    //         address: action.value.address,
    //         city: action.value.city,
    //         houseNumber: action.value.houseNumber,
    //         phoneNumber: action.value.phoneNumber,
    //     }
    // } tidak digunakan karena hanya digabungkan dari data sign up
    return state;
};

const initPhoto = {
    uri:'',
    type:'',
    name:'',
    isUploadPhoto: false,
};

export const photoReducer = (state=initPhoto, action) => {
    if(action.type === 'SET_PHOTO'){
        return{
            ...state,
            uri: action.value.uri,
            type: action.value.type,
            name: action.value.name
        }
    }
    if(action.type === 'SET_UPLOAD_STATUS'){
        return{
            ...state,
            isUploadPhoto: action.value
        }
    }
    return state;
};