const express = require('express')
const app = express()
const port = 3000
var fs = require('fs');
const neatCsv = require('neat-csv');
const spawn = require("child_process").spawn;
var bodyParser = require('body-parser')

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log('\x1b[32m%s\x1b[0m', 'HELO There');  //cyan
console.log('\x1b[32m%s\x1b[0m', 'Welcome to the API');

app.get('/', (req, res) =>{
fs.readFile("bob.html", "utf8", function(err, data){
 if(err){  res.send("yo yo");}
    res.send(data);
  });
});

app.get('/test',(req,res)=>{
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["finance.py"]);
pythonProcess.stdout.on('data', (data) => {
  console.log("elo")
  console.log(data.toString());
  res.send(data.toString());
  });
});

app.get('/getGraph',(req,res)=>{ //takes request to from path /test
const pythonProcess = spawn('python',["GraphMaker.py", req.query.ticker]); //passes query to python script
pythonProcess.stdout.on('data', (data) => { //waits till the script completes and takes the print out as buffer
  res.send(data.toString()); // sends a string version of buffer back to client
  });
});

app.get('/SMP500',(req,res)=>{

  fs.readFile('./sp500_joined_close.csv', async (err, data) => {
    if (err) {
      console.error(err)
        res.send(err);
      return
    }
    console.log("yo yo")
    res.send(await neatCsv(data))
  });
});


app.get('/graph',(req,res)=>{

  res.sendFile('C:/Users/Admin/Desktop/DisPython/sever/index.html');
});


app.post('/upLoadFile',(req,res)=>{

//console.log(req);
console.log(req.body.code);
   fs.writeFile("temp.py", installs + functions + req.body.code + evalCode + graphCode, (err) => {
     if (err){
      console.log(err);
        res.send("Done");
     }else{
       const pythonProcess = spawn('python',["temp.py"]); //passes query to python script
       pythonProcess.stdout.on('data', (data) => {
         //waits till the script completes and takes the print out as buffer
         console.log("done")
         res.send(data.toString()); // sends a string version of buffer back to client
         });
   }
   });
});









evalCode = "\npositions = pd.DataFrame(index=signals.index).fillna(0.0)\n\
positions['AAPL'] = 100*signals['signal']\n\
positions.to_csv('positions1.csv')\n\
portfolio = positions.multiply(aapl['Adj Close'], axis=0)\n\
pos_diff = positions.diff()\n\
portfolio['holdings'] = (positions.multiply(aapl['Adj Close'], axis=0)).sum(axis=1)\n\
portfolio['cash'] = investment - (pos_diff.multiply(aapl['Adj Close'], axis=0)).sum(axis=1).cumsum()\n\
portfolio['total'] = portfolio['cash'] + portfolio['holdings']\n\
portfolio['returns'] = portfolio['total'].pct_change()\n\
#print(portfolio.head())\n\
returns = portfolio['returns']\n\
portfolio.to_csv('portfolio2.csv')\n\
#aapl.to_csv('aapl.csv')\n\
sharpe_ratio = np.sqrt(252) * (returns.mean() / returns.std())\n";

graphCode = "\nfig = plt.figure()\n\
ax1 = fig.add_subplot(111, ylabel='Portfolio value ($)')\n\
portfolio['total'].plot(ax=ax1, color='#88498F' ,lw=2.)\n\
ax1.plot(portfolio.loc[signals.positions == 1.0].index,\n\
             portfolio.total[signals.positions == 1.0],\n\
             '^', markersize=10, color='#48BF84')\n\
ax1.plot(portfolio.loc[signals.positions == -1.0].index,\n\
             portfolio.total[signals.positions == -1.0],\n\
             'v', markersize=10, color='#BA2D0B')\n\
plt.title('Cross Moving Avarages: Portfolio Value Over Time')\n\
ax1.legend(('Portfolio Value','Buy', 'Sell'))\n\
mpld3.plugins.connect(fig)\n\
#print('{ \"host\":\"http://localhost3000\", \"sharpe_ratio\":'+ str(sharpe_ratio) +', \"GraphCode\":'+\ mpld3.fig_to_html(fig) +'}')\n\
#print(mpld3.fig_to_html(fig))\n\
mpld3.save_html(fig, 'index.html')\n\
print(str(sharpe_ratio))\n\
sys.stdout.flush()";








functions = "def getData(ticker, start, end):\n\
    return pdr.get_data_yahoo(ticker,\n\
                              start=datetime.datetime(start[0], start[1], start[2]),\n\
                              end=datetime.datetime(end[0], end[1], end[2]))\n";

installs = "import pandas_datareader as pdr\n\
import datetime\n\
import mpld3\n\
import sys\n\
import pandas as pd\n\
import matplotlib.pyplot as plt\n\
import numpy as np\n"

app.listen(port, () => console.log('\x1b[32m%s\x1b[0m', `Active on port: ${port} `))
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))
