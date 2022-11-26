import React from "react";
import Log from "../components/Log";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          rate: localStorage.getItem('rate') || 0,
          date: '',
          conversionTo1SGD: '',
          allLogs: JSON.parse(localStorage.getItem('allLogs')) || []
        };

        //we need to bind this to the updateLog function because the updateLog function is called in another function (render) where the scope of the 'this' keyword is local to the function only. however, we want 'this' to refer to the global component
        this.updateLog = this.updateLog.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
    }

    setDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        this.setState({date: today})
    }

    updateRate() {
        const val = document.getElementById('rate').value;
        this.setState({rate: val}, () => {
            localStorage.setItem('rate', val)

            const logs = this.state.allLogs;
            for (let i = 0; i < logs.length; i++) {
                logs[i].rate = this.state.rate;
            }

            //NOT SURE IF THIS IS THE MOST ELEGANT WAY
            this.setState({allLogs: []}, () => {
                this.setState({allLogs: logs}, () => {
                    localStorage.setItem('allLogs', JSON.stringify(logs))
                })
            })
        });
    }

    addLog() {
        const value = {
            key: Date.now(),
            date: this.state.date,
            amountSpent: null,
            rate: this.state.rate
        }

        let allLogs = this.state.allLogs;
        allLogs.push(value)

        this.setState({allLogs: allLogs}, () => {
            localStorage.setItem('allLogs', JSON.stringify(allLogs))
        });
    }

    updateLog(key, value) {
        const logs = this.state.allLogs;

        //find index
        let index;
        for (let i = 0; i < logs.length; i++) {
            if(logs[i].key === key) {
                index = i;
                break;
            }
        }

        const log = logs[index]

        log.amountSpent = value;
        
        this.setState({allLogs: logs}, () => {
            localStorage.setItem('allLogs', JSON.stringify(logs))
        })
    }

    deleteLog(key) {
        const logs = this.state.allLogs;

        //find index
        let index;
        for (let i = 0; i < logs.length; i++) {
            if(logs[i].key === key) {
                index = i;
                break;
            }
        }

        logs.splice(index, 1)

        this.setState({allLogs: logs}, () => {
            localStorage.setItem('allLogs', JSON.stringify(logs))
        })
    }

    componentDidMount() {
        this.setDate()
    }

    render() {
        return (
            <div>
                <fieldset>
                    <label>Rate: </label>
                    <input defaultValue={this.state.rate} id="rate"></input>
                    <button onClick={() => {this.updateRate()}}>Update</button>
                </fieldset>

                <p>The current rate is 1 SGD to {this.state.rate} JPY</p>

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount spent in JPY</th>
                            <th>Amount converted to SGD</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.allLogs.map((data) => {            
                            return (<Log key={data.key} keyVal={data.key} date={data.date} amountSpent={data.amountSpent} rate={data.rate} parentCallback= {this.updateLog} parentCallbackForDelete={this.deleteLog} />) 
                        })}
                    </tbody>
                </table>

                <button onClick={() => {this.addLog()}}>Add</button>
            </div>
        );
    }
}