import React from 'react'
import { renderRedux, fireEvent,screen,render } from '../utils/test-utils'
import  App from './app'





test('full app rendering/navigating',() => {
    
    const route = '/'
    const { container, getByText,debug,history } = renderRedux(
         <App />,
        {route} 
     
    );
   
  })