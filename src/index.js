import {render} from 'react-dom'
import React from 'react'
import App from './App.jsx'

const jQuery = window.jQuery;

jQuery( document ).ready(function() {
  const containerEl = document.getElementById("container")
  render(<App/>, containerEl)
});
