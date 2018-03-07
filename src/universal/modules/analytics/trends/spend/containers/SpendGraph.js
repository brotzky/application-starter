/**
 * GRAPHING IS EXPERIMENTAL STAGE RIGHT NOW
 * Will break graphing into it's own use case a try
 * to create a modular framework we can use for all
 * our sexy graphs once I get a better understanding of
 * what is what :
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CASHFLOW_TRENDS_UPDATE_FILTER } from '../../constants';
import { capitalizeString } from 'grow-utils/stringFormatting';
import moment from 'moment';
import numeral from 'numeral';
import {
  VictoryChart,
  VictoryArea,
  VictoryLine,
  VictoryLabel,
  VictoryAxis,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoi,
  VictoryGroup,
  VictoryContainer
} from 'victory';

import SpendGraphController from '../components/SpendGraphController';
import GraphUtils from 'grow-graph/graph-utils/';
import GraphTitle from 'grow-graph/components/GraphTitle';

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

class SpendGraph extends Component {
  constructor(props) {
    super(props);
    this.getCategoryByFilter = this.getCategoryByFilter.bind(this);
    this.getCategoryYears = this.getCategoryYears.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  getCategories() {
    return this.props.byCategory.map(category => category.categoryName);
  }

  getCategoryByFilter() {
    const { filter: { category }, byCategory } = this.props;
    return byCategory.filter(cat => cat.categoryName === category)[0].amounts
  }

  getCategoryYears() {
    const { filter: { category }, byCategory } = this.props;

    return this.getCategoryByFilter()
        .map(amount => amount.yearAndMonth)
        .map(yearAndMonth => moment(yearAndMonth).format('YYYY'))
        .filter((item, pos, arr) => arr.indexOf(item) === pos)
        .reverse();
  }

  getGraphDataByCategory() {
    const { filter: { year } } = this.props;
    const yearFilter = year ? year : this.getCategoryYears()[0];

    if (year === "6" || !year) {
      return this.getCategoryByFilter().slice(-6);
    } else {
      return this.getCategoryByFilter().filter(category => {
        return moment(category.yearAndMonth).format('YYYY') === yearFilter;
      })
    }
  }

  getYDomain() {
    const { filter: { scale }, creditScoresSummaries } = this.props;
    const amounts = this.getGraphDataByCategory().map(category => category.amount);
    return [(Math.min.apply(Math, amounts) / 1.065), (Math.max.apply(Math, amounts) * 1.065)];
  }

  handleFilterChange(filter, value) {
    const { dispatch } = this.props;
    return dispatch({
      type: CASHFLOW_TRENDS_UPDATE_FILTER,
      payload: { [filter]: value },
    });
  }

  angleAxis(oneScore, isDesktop) {
    return this.getGraphDataByCategory().map(d => {
      if (oneScore) {
        return moment(d.date).format(`MMMM YYYY`);
      }

      if (isDesktop) {
        return moment(d.yearAndMonth).format(`MMM ${this.props.filter.year.length > 3 ? '' : ` 'YY`}`);
      } else {
        return moment(d.yearAndMonth).format(`MMM`);
      }
    });
  }

  render() {
    const {
      creditScoresSummaries,
      totalSpend,
      isDesktop,
      width,
      graphPadding,
      xLabel,
      yLabel,
    } = this.props;
    const oneScore = totalSpend.length === 1;

    return (
      <div className="Graph">
        <GraphTitle title="Spend History" />
        <SpendGraphController
          handleFilterChange={this.handleFilterChange}
          years={this.getCategoryYears()}
          categories={this.getCategories()}
          months={months}
        />
        <VictoryChart
          theme={GraphUtils.theme}
          width={width}
          padding={graphPadding}
          containerComponent={<VictoryContainer responsive={false}/>}
        >
          <VictoryAxis 
            tickValues={this.getGraphDataByCategory().map(d => new Date(d.yearAndMonth))}
            tickFormat={this.angleAxis(oneScore, isDesktop)}
            tickLabelComponent={
              <VictoryLabel
                angle={xLabel.angle}
                dy={xLabel.dy}
                dx={xLabel.dx}
                textAnchor={xLabel.textAnchor}
              />
            }
          />
          <VictoryAxis
            dependentAxis
            tickFormat={GraphUtils.currencyTicks}
            tickLabelComponent={<VictoryLabel dx={yLabel.dx} />}
          />
          <VictoryGroup
            data={this.getGraphDataByCategory()}
            x={(d) => new Date(d.yearAndMonth)}
            y="amount"
            scale={GraphUtils.timeScale}
            domain={{ y: this.getYDomain() }}
          >
            <VictoryArea />
            <VictoryLine />
            <VictoryVoronoi
              labels={(d) => `${numeral(d.amount).format(`$0,0.00`)} \n ${moment(d.yearAndMonth).format('MMMM do YYYY')}`}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={GraphUtils.theme.tooltip.flyoutStyle}
                  style={GraphUtils.theme.tooltip.style}
                  pointerLength={GraphUtils.theme.tooltip.pointerLength}
                  pointerWidth={GraphUtils.theme.tooltip.pointerWidth}
                  corderRadius={GraphUtils.theme.tooltip.corderRadius}
                />
              }
            />
            {!oneScore && isDesktop && <VictoryScatter />}
            {oneScore && <VictoryScatter />}
          </VictoryGroup>
        </VictoryChart>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  creditScoresSummaries: state.analytics.creditScore.summaries,
  filter: state.analytics.spend.filter,
  totalSpend: state.analytics.spend.spendData.byCategory.filter(data => data.categoryName === "TOTAL_SPEND")[0].amounts.slice(-12),
  byCategory: state.analytics.spend.spendData.byCategory,
});

export default connect(mapStateToProps)(SpendGraph);