import React,{Component} from 'react'

const isDevelopment = false
export default class CurrencySelector extends Component{
  constructor(props){
    super(props)
    this.state = {value:''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
     this.setState({
       value: event.target.value
     });
     if(isDevelopment){
       console.log("CurrencySelector-handleChange-eventValue",event.target.value)
       console.log("CurrencySelector-handleChange-setStateValue",this.state.value)
     }
     this.props.selectedCurrency(event.target.value)
   }

  render(){
    const targetElem = document.getElementById('currencySelector')

    const findSelectedCurrencyType =()=>{

    const targetElem = document.getElementById('currencySelector')
    targetElem.value = this.props.updatedCurrency
    if(isDevelopment){
      console.log('CurrencySelector-render-currencyTarget',this.props.updatedCurrency)
      console.log("CurrencySelector-render-TargetElem",targetElem)
      console.log('CurrencySelector-render-insideFunction findSelectedCurrencyType')
      console.log('CurrencySelector-render-currencyTarget',targetElem.value)
    }
    return targetElem.value
    }

    return(
      <div>
        <form id='formID' >
             <select  onChange={this.handleChange} id="currencySelector" name="currency_code">
              <option value="" >Select Currency</option>
              <option value="AUD">Australian Dollar</option>
              <option value="BRL">Brazilian Real </option>
              <option value="CAD">Canadian Dollar</option>
              <option value="CZK">Czech Koruna</option>
              <option value="DKK">Danish Krone</option>
              <option value="EUR">Euro</option>
              <option value="HKD">Hong Kong Dollar</option>
              <option value="HUF">Hungarian Forint </option>
              <option value="ILS">Israeli New Sheqel</option>
              <option value="JPY">Japanese Yen</option>
              <option value="MYR">Malaysian Ringgit</option>
              <option value="MXN">Mexican Peso</option>
              <option value="NOK">Norwegian Krone</option>
              <option value="NZD">New Zealand Dollar</option>
              <option value="PHP">Philippine Peso</option>
              <option value="PLN">Polish Zloty</option>
              <option value="GBP">Pound Sterling</option>
              <option value="SGD">Singapore Dollar</option>
              <option value="SEK">Swedish Krona</option>
              <option value="CHF">Swiss Franc</option>
              <option value="TWD">Taiwan New Dollar</option>
              <option value="THB">Thai Baht</option>
              <option value="TRY">Turkish Lira</option>
              <option value="USD" defaultValue="YES">U.S. Dollar</option>
          </select>
          </form>
        </div>
      )
    }
}
