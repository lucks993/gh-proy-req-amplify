import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as actions from './auth-actions';
import * as types from './types';
import reducer from './auth-reducer'
import {configRequestToken,configRequeshToken}from './auth-api';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mock = new MockAdapter(axios);

window.location.assign = jest.fn();

//ACTIONS

describe('async actions', () => {
  afterEach(() => {
    mock.restore()
  })

  it('creates GET_TOKEN ', () => {


    mock.onPost('/token',null,{
      configRequestToken
    }).reply(200,{
      tokeId:'123456'   
  })



    const expectedActions = [
      { type: types.GET_TOKEN,payload:true },
       { type: types.GET_TOKEN_ERROR, payload:true }
     // { type: types.GET_TOKEN_SUCCESS, payload: 123456 }
    ]
    const store = mockStore({ })

    return store.dispatch(actions.getTokenAction()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('async actions', () => {
  afterEach(() => {
    mock.restore()

  })

  it('creates LOAD_USER ', () => {
    mock.onGet('/userInfo',null,{
      configRequestToken
    }).reply(200,{
      user:{
        sub:'abc',
        name:'Raul Ramos',
        email:'raul.ramos.m@gmail.com',
        username:'raul123'
      }   
  })

    const expectedActions = [
      { type: types.USER_LOAD,payload:true },
       { type: types.USER_LOAD_ERROR, payload:true }
     /* { type: types.GET_LOAD_SUCCESS, payload: user{
        sub:'abc',
        name:'Raul Ramos',
        email:'raul.ramos.m@gmail.com',
        username:'raul123'
     }}*/
    ]
    const store = mockStore({ })

    return store.dispatch(actions.loadUserAction()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})


describe('async actions', () => {
  afterEach(() => {
    mock.restore()
  })

  it('creates REFRESH TOKEN ', () => {
    mock.onGet('/token',null,{
      configRequeshToken
    }).reply(200,{
      token:'123456'   
  })

    const expectedActions = [
      { type: types.REFRESH_TOKEN,payload:true },
       { type: types.REFRESH_TOKEN_ERROR, payload:true }
     // { type: types.REFRESH_TOKEN_SUCCESS, payload: 123456 }
    ]
    const store = mockStore({})

    return store.dispatch(actions.refreshTokenAction()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})


describe('actions', () => {
  afterEach(() => {
    mock.restore()
  })

  it('creates LOGOUT ', () => {
    const expectedAction = [
      { type: types.LOGOUT,payload:true},
      { type: types.LOGOUT_SUCCESS },
    ]
     // { type: types.REFRESH_TOKEN_SUCCESS, payload: 123456 }
     const store = mockStore({})
     window.location.assign = jest.fn();

     return store.dispatch(actions.logoutAction()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedAction)
    })
  
  })
})

//REDUCERS

describe('get token reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        tokenId: localStorage.getItem('token'),
        isAuthenticated:false,
        loading: false,
        user:'',
        error:null
      }
    )
  })

})

describe('authentication reducer', () => {
  
  it('should handle GET_TOKEN', () => {
    expect(
      reducer([], {
        type: types.GET_TOKEN,
        payload:true
      })
    ).toEqual(
      {
        loading: true
      }
    )
  })

  it('should handle GET_TOKEN_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.GET_TOKEN_SUCCESS,
        payload:'12345'
      })
    ).toEqual(
      {
        loading:false,
        tokenId: '12345'
      }
    )
  })

  it('should handle GET_TOKEN_ERROR', () => {
    expect(
      reducer([], {
        type: types.GET_TOKEN_ERROR,
        payload:true
      })
    ).toEqual(
      {
        loading: false,
        error:true
      }
    )
  })
  it('should handle USER_LOAD_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.USER_LOAD_SUCCESS,
        payload:{user:'raulramos',email:'raulramos@gmail.com'}
      })
    ).toEqual(
      {
        isAuthenticated: true,
        loading:false,
        user:{user:'raulramos',email:'raulramos@gmail.com'}
      }
    )
  })
  it('should handle LOGOUT_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.LOGOUT_SUCCESS
    
      })
    ).toEqual(
      {
        isAuthenticated: false,
        tokenId:null,
        user:null,
        loading:false
      }
    )
  })
  it('should handle USER_LOAD_ERROR', () => {
    expect(
      reducer([], {
        type: types.USER_LOAD_ERROR,
      })
    ).toEqual(
      {
        loading:false,
        isAuthenticated:false,
      }
    )
  })


})


