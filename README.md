# automated-spending-logger

This app converts money spent in a currency to your home currency and updates a google sheet with your spending. This app is useful to keep track of cash spending overseas that is not automatically logged and converted in your banking app.

This app works with the corresponding api: https://github.com/enjiruuuu/automated-spending-logger-api. Instructions to get that started are listed there.

## Getting Started
Steps to get the app running:
1. Ensure the corresponding API is up and running
2. install packages with ```npm install```
3. Start the program with ```npm start```. The default port the app starts in is ```:3000```.

## How to use
1. Update the exchange rate you exchanged your cash for. For example if you exchanged 1 SGD for 25 Thai Baht, enter ```25``` in the ```rate``` field and click ```update```.
2. To add a new logs, click the ```Add``` button and edit the fields. Click ```Update``` for each row after you are done editing that row.
3. Once you are ready to upload all present logs to google sheets, click the ```Update Sheet``` button.
