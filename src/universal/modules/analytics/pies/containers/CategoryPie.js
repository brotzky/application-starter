import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import {
  VictoryPie,
  VictoryContainer,
  VictoryVoronoi,
  VictoryTooltip,
  VictoryGroup
} from 'victory';
import GraphUtils from 'grow-graph/graph-utils/';
import GraphTitle from 'grow-graph/components/GraphTitle';
import { capitalizeString } from 'grow-utils/stringFormatting';

import '../styles/CategoryPie.scss';

const categoryColorMap = {
  BANK_FEES: '#FD9191',
  CHILDREN: '#DAA2FF',
  COFFEE_SHOP: '#FEA386',
  EDUCATION: '#4DD4FF',
  ELECTRICITY: '#FDDD8A',
  ENTERTAINMENT: '#B2ED4D',
  GROCERIES: '#FFB34D',
  HOUSING: '#FF7D5D',
  PETS: '#007CB9',
  OTHER: '#6E8BFF'
};

class CategoryPie extends Component {
  constructor(props) {
    super(props);
    this.state = { legendWidth: 0 };
  }

  componentDidMount() {
    this.setState({
      legendWidth: document.querySelector('.CategoryPie__legend').offsetWidth
    });
  }

  getMonthName(listYear) {
    const { trends: { spendData: { byMonth } } } = this.props;
    const month = byMonth.find(x => x.yearAndMonth === listYear);
    return moment(month.yearAndMonth).format('MMMM');
  }

  getOtherSpendCategory(listYear, amountToSubtract) {
    const { trends: { spendData: { byMonth } } } = this.props;
    const monthData = byMonth.find(x => x.yearAndMonth === listYear);
    const totalOtherSpend = monthData.data
      .filter(x => x.categoryName !== 'TOTAL_SPEND')
      .map(x => ({ amount: x.amounts[1].amount }))
      .reduce((acc, curr) => {
        acc += curr.amount;
        return acc;
      }, 0);
    return {
      amount: totalOtherSpend - amountToSubtract,
      categoryName: 'OTHER'
    };
  }

  getTopFiveHighestSpendCategories(listYear) {
    const { trends: { spendData: { byMonth } } } = this.props;
    const monthData = byMonth.find(x => x.yearAndMonth === listYear);
    return monthData.data
      .map(x => ({
        amount: x.amounts[1].amount,
        categoryName: x.categoryName
      }))
      .filter(x => x.categoryName !== 'TOTAL_SPEND')
      .sort((a, b) => {
        if (a.amount > b.amount) {
          return -1;
        } else if (b.amount > a.amount) {
          return 1;
        } else {
          return 0;
        }
      })
      .slice(0, 5);
  }

  getTotalSpend(listYear) {
    const { trends: { spendData: { byMonth } } } = this.props;
    const month = byMonth.find(x => x.yearAndMonth === listYear);
    return month.data.find(x => x.categoryName === 'TOTAL_SPEND').amounts[1]
      .amount;
  }

  renderPie(data, listYear) {
    return (
      <div className="CategoryPie__pie-wrapper">
        <VictoryPie
          data={data}
          animate={{
            duration: 500,
            onLoad: { duration: 500 },
            onEnter: { duration: 500 }
          }}
          height={350}
          width={350}
          containerComponent={
            <VictoryContainer
              responsive={this.props.width - this.state.legendWidth < 350}
            />
          }
          innerRadius={150}
          padding={0}
          x="categoryName"
          y="amount"
          style={{
            data: {
              fill: d => categoryColorMap[d.categoryName]
            },
            labels: { display: 'none' }
          }}
        />
        <div className="CategoryPie__label">
          <div className="CategoryPie__label-lg">
            {numeral(this.getTotalSpend(listYear)).format('$0,0.00')}
          </div>
          <div className="CategoryPie__label-sm">Total Spend</div>
        </div>
      </div>
    );
  }

  renderPieLegend(data) {
    if (data.length) {
      return (
        <div className="CategoryPie__legend">
          {data.map(category => {
            return (
              <div
                className="CategoryPie__legend-item"
                key={category.categoryName}
              >
                <span
                  className="CategoryPie__legend-circle"
                  style={{
                    background: categoryColorMap[category.categoryName]
                  }}
                />
                <div className="TrendPie__legend-info">
                  <div className="CategoryPie__legend-name">
                    {capitalizeString(category.categoryName, '_', ' ')}
                  </div>
                  <div className="CategoryPie__legend-amount">
                    {numeral(category.amount).format('$0,0.00')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    const { trends: { filter: { listYear } } } = this.props;
    const topFiveCategories = this.getTopFiveHighestSpendCategories(listYear);
    const topFiveCategoriesTotalAmount = topFiveCategories.reduce(
      (acc, curr) => (acc += curr.amount),
      0
    );
    const otherSpendCategory = this.getOtherSpendCategory(
      listYear,
      topFiveCategoriesTotalAmount
    );
    const topFiveCategoriesAndOther = [
      ...topFiveCategories,
      otherSpendCategory
    ];

    return (
      <div className="CategoryPie">
        <GraphTitle title="Top Five Spending Categories" />
        <div className="CategoryPie__content">
          {this.renderPieLegend(topFiveCategoriesAndOther)}
          {this.renderPie(topFiveCategoriesAndOther, listYear)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trends: state.analytics.spend
});

export default connect(mapStateToProps)(CategoryPie);
