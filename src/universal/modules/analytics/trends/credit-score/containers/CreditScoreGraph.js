/**
 * GRAPHING IS EXPERIMENTAL STAGE RIGHT NOW
 * Will break graphing into it's own use case a try
 * to create a modular framework we can use for all
 * our sexy graphs once I get a better understanding of
 * what is what :
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CREDIT_SCORE_TRENDS_UPDATE_FILTER } from '../../constants';
import moment from 'moment';
import {
  VictoryChart,
  VictoryArea,
  VictoryLine,
  VictoryLabel,
  VictoryAxis,
  VictoryGroup,
  VictoryScatter,
  VictoryContainer,
  VictoryVoronoi,
  VictoryTooltip,
} from 'victory';

import CreditScoreGraphController from '../components/CreditScoreGraphController';
import GraphTitle from 'grow-graph/components/GraphTitle';
import GraphUtils from 'grow-graph/graph-utils';

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const createDates = d => new Date(d.date);

class CreditScoreGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.getCreditScoreYears = this.getCreditScoreYears.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  getCreditScoreYears() {
    const { creditScoresSummaries } = this.props;

    return creditScoresSummaries
      .map(summary => moment(summary.date).format('YYYY'))
      .filter((item, pos, arr) => arr.indexOf(item) === pos)
      .reverse();
  }

  handleFilterChange(filter, value) {
    const { dispatch } = this.props;
    return dispatch({
      type: CREDIT_SCORE_TRENDS_UPDATE_FILTER,
      payload: { [filter]: value },
    });
  }

  filterCreditSummaries() {
    const { filter: { year }, creditScoresSummaries } = this.props;
    const yearFilter = year ? year : this.getCreditScoreYears()[0];

    if (year === "6" || !year) {
      return creditScoresSummaries.slice(-6);
    } else {
      return creditScoresSummaries.filter(summary => {
        return moment(summary.date).format('YYYY') === yearFilter;
      })
    }
  }

  getYDomain() {
    const { filter: { scale } } = this.props;
    const scores = this.filterCreditSummaries().map(summary => summary.score);
    return scale !== "ZOOMED"
      ? [300, 900]
      : [(Math.min.apply(Math, scores) - 10), (Math.max.apply(Math, scores) + 10)];
  }

  getXDomain() {
    const { creditScoresSummaries } = this.props;
    const range = [];

    range.push(new Date(moment(creditScoresSummaries[0].date).add(-1, 'months')));
    range.push(new Date(moment(creditScoresSummaries[0].date).add(1, 'months')));

    return range
  }

  angleAxis(oneScore, isDesktop) {
    return this.filterCreditSummaries().map(d => {
      if (oneScore) {
        return moment(d.date).format(`MMMM YYYY`);
      }

      if (isDesktop) {
        return moment(d.date).format(`MMM ${this.props.filter.year.length > 3 ? '' : ` 'YY`}`);
      } else {
        return moment(d.date).format(`MMM`);
      }
    });
  }

  render() {
    const {
      creditScoresSummaries,
      filter: { scale },
      isDesktop,
      width,
      graphPadding
    } = this.props;
    const oneScore = this.filterCreditSummaries().length === 1;

    return (
      <div className="Graph">
        <GraphTitle
          title="Credit Score History"
        />
        <CreditScoreGraphController
          handleFilterChange={this.handleFilterChange}
          years={this.getCreditScoreYears()}
          months={months}
        />
        <VictoryChart
          width={width}
          padding={graphPadding}
          theme={GraphUtils.theme}
          containerComponent={<VictoryContainer responsive={false}/>}
        >
          <VictoryAxis 
            tickValues={this.filterCreditSummaries().map(createDates)}
            tickFormat={this.angleAxis(oneScore, isDesktop)}
            tickLabelComponent={
              <VictoryLabel
                angle={isDesktop ? 0 : 60}
                dy={isDesktop ? 2 : 0}
                dx={isDesktop ? 0 : -1}
                textAnchor={isDesktop ? "middle" : "start"}
              />
            }
             />
          <VictoryAxis
            dependentAxis
            tickValues={scale === "STANDARD" ? [300, 500, 700, 900]: null}
            tickLabelComponent={<VictoryLabel dx={isDesktop ? -10 : 4} />}
          />
          <VictoryGroup
            data={this.filterCreditSummaries()}
            x={createDates}
            y="score"
            scale={GraphUtils.timeScale}
            domain={{ y: this.getYDomain() }}
          >
            <VictoryArea />
            <VictoryLine />
            <VictoryVoronoi
              labels={(d) => `${d.score} \n ${moment(d.date).format('MMMM do YYYY')}`}
              labelComponent={
                <VictoryTooltip
                  dy={3}
                  flyoutStyle={GraphUtils.theme.tooltip.flyoutStyle}
                  style={GraphUtils.theme.tooltip.style}
                  pointerLength={GraphUtils.theme.tooltip.pointerLength}
                  pointerWidth={GraphUtils.theme.tooltip.pointerWidth}
                  corderRadius={GraphUtils.theme.tooltip.corderRadius}
                />
              }
            />
            {!oneScore && isDesktop && <VictoryScatter />}
            {oneScore && <VictoryScatter size={6} domain={{ x: this.getXDomain(), y: this.getYDomain() }}  />}
           </VictoryGroup>
        </VictoryChart>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  creditScoresSummaries: state.analytics.creditScore.summaries,
  filter: state.analytics.creditScore.filter,
});

export default connect(mapStateToProps)(CreditScoreGraph);
