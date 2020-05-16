import datetime as dt
import matplotlib.pyplot as plt
from matplotlib import style
import pandas as pd
import pandas_datareader.data as web

import sys
#embed mat plot in web page
style.use('ggplot')

#start = dt.datetime(2000,1,1)
#end = dt.datetime(2016,12,31)

#df = web.DataReader('TSLA', 'yahoo', start, end)
#print(df.tail(6))
#df.to_csv('tsla.csv')

#text index is a data frame!!

testIndex = pd.read_csv('tsla.csv', parse_dates=True, index_col=0)
#testIndex['Adj Close'].plot() #plot the data
#plt.show()

testIndex['100ma'] = testIndex['Adj Close'].rolling(window=100, min_periods=0).mean()
#testIndex.dropna(inplace=True) #removes NANs
#print(testIndex.head())

ax1 = plt.subplot2grid((6,1) , (0,0), rowspan=5, colspan=1)
ax2 = plt.subplot2grid((6,1) , (5,0), rowspan=1, colspan=1, sharex = ax1)

ax1.plot(testIndex.index, testIndex['Adj Close']) #can add line color ect
ax1.plot(testIndex.index, testIndex['100ma'])
ax2.bar(testIndex.index, testIndex['Volume'])

#plt.show()

#print(sys.argv[1])
#print("URL":"http://localhost:3000")
#print('{ "host":"http://localhost3000", "age":30, "city":"New York"}');

print('{ "host":"http://localhost3000", "age":'+sys.argv[1] +', "city":"New York"}');




sys.stdout.flush()

# assigning b a value of 56
