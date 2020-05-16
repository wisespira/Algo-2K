import pandas_datareader as pdr
import datetime
import mpld3
import sys
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
def getData(ticker, start, end):
    return pdr.get_data_yahoo(ticker,
                              start=datetime.datetime(start[0], start[1], start[2]),
                              end=datetime.datetime(end[0], end[1], end[2]))

#Cross moving Avrages Implementation
#Sets investment
investment= float(10000.0)
#sets Strategy
aapl = getData('AAPL', [2016,10,1],[2019,10,1])
# Initialize the short and long Avarage lengths
short_window = 30
long_window = 100
# Creates Signals data with the Apple stock dates
# Initilizes all and signals column to zero
signals = pd.DataFrame(index=aapl.index)
signals['signal'] = 0.0
# Create moving average over the short window
signals['shortMovingAvarage'] = aapl['Close'].rolling(window=short_window, min_periods=1, center=False).mean()
signals['longMovingAvarage'] = aapl['Close'].rolling(window=long_window, min_periods=1, center=False).mean()
# Calculate trading signals
signals['signal'][short_window:] = np.where(signals['shortMovingAvarage'][short_window:]
                                              > signals['longMovingAvarage'][short_window:], 1.0, 0.0)
# Generate Positions
signals['positions'] = signals['signal'].diff()


positions = pd.DataFrame(index=signals.index).fillna(0.0)
positions['AAPL'] = 100*signals['signal']
positions.to_csv('positions1.csv')
portfolio = positions.multiply(aapl['Adj Close'], axis=0)
pos_diff = positions.diff()
portfolio['holdings'] = (positions.multiply(aapl['Adj Close'], axis=0)).sum(axis=1)
portfolio['cash'] = investment - (pos_diff.multiply(aapl['Adj Close'], axis=0)).sum(axis=1).cumsum()
portfolio['total'] = portfolio['cash'] + portfolio['holdings']
portfolio['returns'] = portfolio['total'].pct_change()
#print(portfolio.head())
returns = portfolio['returns']
portfolio.to_csv('portfolio2.csv')
#aapl.to_csv('aapl.csv')
sharpe_ratio = np.sqrt(252) * (returns.mean() / returns.std())

fig = plt.figure()
ax1 = fig.add_subplot(111, ylabel='Portfolio value ($)')
portfolio['total'].plot(ax=ax1, color='#88498F' ,lw=2.)
ax1.plot(portfolio.loc[signals.positions == 1.0].index,
             portfolio.total[signals.positions == 1.0],
             '^', markersize=10, color='#48BF84')
ax1.plot(portfolio.loc[signals.positions == -1.0].index,
             portfolio.total[signals.positions == -1.0],
             'v', markersize=10, color='#BA2D0B')
plt.title('Cross Moving Avarages: Portfolio Value Over Time')
ax1.legend(('Portfolio Value','Buy', 'Sell'))
mpld3.plugins.connect(fig)
#print('{ "host":"http://localhost3000", "sharpe_ratio":'+ str(sharpe_ratio) +', "GraphCode":'+ mpld3.fig_to_html(fig) +'}')
#print(mpld3.fig_to_html(fig))
mpld3.save_html(fig, 'index.html')
print(str(sharpe_ratio))
sys.stdout.flush()