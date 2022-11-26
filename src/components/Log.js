import React from "react";

export default class Log extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            convertedAmount: 0.00,
            amountSpent: 0.00,
            conversionTo1SGD: 0.00,
            description: '',
            category: ''
        }
    }

    componentDidMount() {
        this.setState({rate: this.props.rate})
        this.setState({category: this.props.category})

        this.calculateAmtIn1SGD().then(() => {
            if (this.props.amountSpent != null) {
                this.setState({amountSpent: this.props.amountSpent})

                if (this.props.convertedAmount != null) {
                    this.setState({convertedAmount: this.props.convertedAmount})
                }

                if (this.props.description != null) {
                    this.setState({description: this.props.description})
                }
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

    updateDescription(target) {
        this.setState({description: target.value})
    }

    updateCategory(target){
        this.setState({category: target.value})
    }

    submitUpdatedValueToParent() {
        const key = this.props.keyVal;
        const val = this.state.amountSpent;
        const convertedAmount = this.state.convertedAmount;
        const description = this.state.description;
        const category = this.state.category;

        this.props.parentCallback(key, val, convertedAmount, description, category)
    }

    submitDeleteRequestToParent() {
        this.props.parentCallbackForDelete(this.props.keyVal)
    }

    render() {
        return (
            <tr>
                <td>{this.props.date}</td>
                <td>
                    <select defaultValue={this.props.category} onChange={(e) => {this.updateCategory(e.target)}}>
                        <option value="Shopping">Shopping</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                    </select>
                </td>
                <td><input defaultValue={this.props.description} onChange={(e) => {this.updateDescription(e.target)}}></input></td>
                <td><input defaultValue={this.props.amountSpent} onChange={(e) => {this.convertAmtSpentToSGD(e.target)}}></input></td>
                <td><p>{parseFloat(this.state.convertedAmount).toFixed(2)}</p></td>
                <td><button onClick={() => {this.submitUpdatedValueToParent()}}>Update</button></td>
                <td><button onClick={() => {this.submitDeleteRequestToParent()}}>Delete</button></td>
            </tr>
        )
    }
}