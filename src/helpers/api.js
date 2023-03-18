import axios from 'axios';

export default class Api {
    async updateSheet(logs) {
        console.log('updating')
        const request = {
            logs: this.formatRequest(logs),
            sheetId: '1J-b1RBUcEGuH9RZ015cBhn0S8ZTRmlDWfOUnoATpB5U',
        }

        return await axios.post(`https://automated-spending-logger-api.onrender.com/update`, request)
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    formatRequest(logs) {
        const request = []
        for (let i = 0; i < logs.length; i++) {
            const temp = []
            temp.push(logs[i].date);
            temp.push(logs[i].category);
            temp.push(logs[i].description);
            temp.push(logs[i].amountSpent);
            temp.push(logs[i].convertedAmount);

            request.push(temp)
        }

        return request;
    }
}