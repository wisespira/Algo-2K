import matplotlib.pyplot as plt
import numpy as np
import mpld3

import matplotlib.pyplot as plt
from matplotlib import style
import pandas as pd
import pandas_datareader.data as web

import matplotlib.dates as mdates
from mpl_finance import candlestick_ohlc

import sys

#print('"stock_dfs/'+sys.argv[1]+'.csv"')
#add check for CSV


testIndex = pd.read_csv('stock_dfs/'+sys.argv[1]+'.csv', parse_dates=True, index_col=0)
#testIndex['100ma'] = testIndex['Adj Close'].rolling(window=100, min_periods=0).mean()

testIndex_ohlc = testIndex['Adj Close'].resample('10D').ohlc() #openHighLowClose
testIndex_Volume = testIndex['Volume'].resample('10D').sum()

testIndex_ohlc.reset_index(inplace=True)
testIndex_ohlc['Date'] = testIndex_ohlc['Date'].map(mdates.date2num)

fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)
ax.plot(testIndex.index, testIndex['Adj Close'])
#ax.plot(testIndex.index, testIndex['Volume'])



#f= open(sys.argv[1] +".html","w+")
#f.write(mpld3.fig_to_html(fig))
#f.close
mpld3.plugins.connect(fig)
#print('{ "host":"http://localhost3000", "age": "stock_dfs/'+sys.argv[1]+'.csv", "city":"New York"}');
print(mpld3.fig_to_html(fig))


sys.stdout.flush()
