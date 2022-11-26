import React from "react";

export default class Log extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            convertedAmount: 0.00,
            amountSpent: 0.00,
            conversionTo1SGD: 0.00,
        }
    }

    componentDidMount() {
        this.setState({rate: this.props.rate})
        this.calculateAmtIn1SGD().then(() => {
            if (this.props.amountSpent != null) {
                this.setState({amountSpent: this.props.amountSpent})

            //do the conversion according to latest rate that's passed in from parent component
            this.calculateAmountSpentBasedOnRate(this.props.amountSpent)
            }
        })
    }


    async calculateAmtIn1SGD() {
        const calc = (1 / this.props.rate)
        this.setState({conversionTo1SGD: calc}, () => {
            Promise.resolve()
        })
    }

    calculateAmountSpentBasedOnRate(amountSpent) {
        const calc = amountSpent * this.state.conversionTo1SGD;
        const to2DP = parseFloat(calc).toFixed(2)
        this.setState({convertedAmount: to2DP})
    }

    convertAmtSpentToSGD(target) {
        this.calculateAmountSpentBasedOnRate(target.value)
        this.setState({amountSpent: target.value})
    }

    submitUpdatedValueToParent() {
        const key = this.props.keyVal;
        const val = this.state.amountSpent;

        this.props.parentCallback(key, val)
    }

    submitDeleteRequestToParent() {
        this.props.parentCallbackForDelete(this.props.keyVal)
    }

    render() {
        return (
            <tr>
                <td>{this.props.date}</td>
                <td><input defaultValue={this.props.amountSpent} onChange={(e) => {this.convertAmtSpentToSGD(e.target)}}></input></td>
                <td><p>{parseFloat(this.state.convertedAmount).toFixed(2)}</p></td>
                <td><button onClick={() => {this.submitUpdatedValueToParent()}}>Update</button></td>
                <td><button onClick={() => {this.submitDeleteRequestToParent()}}>Delete</button></td>
            </tr>
        )
    }
}