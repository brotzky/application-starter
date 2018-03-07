import React from 'react';

const ChecklistTop = width => (
  <div className="ChecklistPlaceholderTopRow">
    <div style={{ display: 'flex' }}>
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '34px' }}
      />
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '44px' }}
      />
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '38px' }}
      />
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '38px' }}
      />
    </div>
    <div
      className="ChecklistPlaceholderTopRow__details"
      style={{ display: 'flex' }}
    >
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '72px' }}
      />
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '73px' }}
      />
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '80px' }}
      />
      <div
        className="ChecklistPlaceholderTopRow__primary"
        style={{ width: '88px', marginRight: '0' }}
      />
    </div>
  </div>
);

const HeaderRow = width => (
  <div className="ChecklistPlaceholderHeaderRow">
    <div className="ChecklistPlaceholderHeaderRow__header" style={{ width }} />
    <div className="ChecklistPlaceholderHeaderRow__details">
      <div className="ChecklistPlaceholderHeaderRow__details-line" />
      <div className="ChecklistPlaceholderHeaderRow__details-circle" />
    </div>
  </div>
);

const ChecklistRow = width => (
  <div className="ChecklistPlaceholderRow">
    <div className="ChecklistPlaceholderRow__front">
      <div className="ChecklistPlaceholderRow__front-circle" />
      <div className="ChecklistPlaceholderRow__front-line" style={{ width }} />
    </div>
    <div className="ChecklistPlaceholderRow__circle" />
  </div>
);

const ChecklistPlaceholder = () => (
  <div>
    {ChecklistTop('278px')}
    {HeaderRow('278px')}
    {ChecklistRow('125px')}
    {ChecklistRow('144px')}
    {ChecklistRow('150px')}
    {ChecklistRow('135px')}
    {HeaderRow('219px')}
    {ChecklistRow('119px')}
    {ChecklistRow('85px')}
    {ChecklistRow('115px')}
    {ChecklistRow('145px')}
    {HeaderRow('231px')}
    {ChecklistRow('132px')}
    {ChecklistRow('123px')}
    {ChecklistRow('103px')}
    {ChecklistRow('133px')}
    {HeaderRow('231px')}
    {ChecklistRow('132px')}
    {ChecklistRow('123px')}
    {ChecklistRow('103px')}
    {ChecklistRow('133px')}
  </div>
);

export default ChecklistPlaceholder;
