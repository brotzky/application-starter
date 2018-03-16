import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import browserHistory from 'react-router/lib/browserHistory';

import {
  FirebaseAPI,
  formatLanguageDefinitions,
  filterLanguageDefinitions,
} from '../lib';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import { Card, Dropdown } from '../../../ui/components';
import Tab from '../components/Tab';
import TabBar from '../components/TabBar';
import Dashboard from './Dashboard';
import DashboardSidebar from '../components/DashboardSidebar';
import Editor from './Editor';
import EditorSidebar from '../components/EditorSidebar';
import OrgLanguageList from '../components/OrgLanguageList';
import ViewPermission from '../../../ui/components/Permissions/ViewPermission';
import isGrowEmployee from 'gac-utils/isGrowEmployee';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 1050px;
`;

const ContentCard = Card.extend`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const TabDefinition = {
  dev: { value: 'dev', display: 'Development' },
  qa: { value: 'qa', display: 'QA' },
  uat: { value: 'uat', display: 'UAT' },
  prod: { value: 'prod', display: 'Production' },
};

class Translator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languages: [],
      languageDefinitions: [],
      selectedLanguageDefs: {},
      selectedLanguageKey: props.params.lang,
      activeCategory: null,
      activeTab: props.params.env,
    };

    this.languageDropdownSearch = new Fuse(this.state.languageDefinitions, {
      distance: 50,
      keys: ['display'],
      minMatchCharLength: 3,
      shouldSort: true,
      threshold: 0.5,
    });
  }

  async componentDidMount() {
    const firebaseURL = `https://grow-translate.firebaseio.com`;
    this.firebaseAPI = new FirebaseAPI(`${firebaseURL}/${this.props.org}`);
    try {
      const orgLanguages = await this.firebaseAPI.fetchLanguages(
        this.state.activeTab,
      );
      const languageDefinitions = formatLanguageDefinitions(
        filterLanguageDefinitions(orgLanguages),
      );
      let selectedLanguageDefs;
      if (this.state.selectedLanguageKey) {
        selectedLanguageDefs = await this.firebaseAPI.fetchOrgLanguage(
          this.state.activeTab,
          this.state.selectedLanguageKey,
        );
      }
      this.setState({
        languages: formatLanguageDefinitions(orgLanguages),
        languageDefinitions,
        selectedLanguageDefs,
      });
    } catch (e) {
      console.error(e);
    }
  }

  onCategoryAdd = category => {
    if (category.length <= 0) return;
    const selectedLanguageDefs = this.state.selectedLanguageDefs;
    this.setState({
      selectedLanguageDefs: {
        ...selectedLanguageDefs,
        [category]: {},
      },
    });
  };

  onSidebarCategoryClick = key => {
    this.setState({ activeCategory: key });
  };

  onNewLanguageSelect = async ({ value }) => {
    const selectedLanguageDefs = await this.firebaseAPI.createLanguage(
      this.props.org,
      this.state.activeTab,
      value,
    );
    const orgLanguages = await this.firebaseAPI.fetchLanguages(
      this.state.activeTab,
    );
    const languageDefinitions = formatLanguageDefinitions(
      filterLanguageDefinitions(orgLanguages),
    );
    this.setState({
      selectedLanguageDefs,
      selectedLanguageKey: value,
      languages: formatLanguageDefinitions(orgLanguages),
      languageDefinitions,
    });
  };

  onAddDefinition = async def => {
    const { activeTab, selectedLanguageKey } = this.state;
    await this.firebaseAPI.updateLanguage(
      this.props.org,
      activeTab,
      selectedLanguageKey,
      def,
    );
    const selectedLanguageDefs = {
      ...this.state.selectedLanguageDefs,
    };
    this.setState({
      selectedLanguageDefs: _set(selectedLanguageDefs, def.path, def.value),
    });
  };

  onDeleteDef = async path => {
    await this.firebaseAPI.deleteDef(
      path,
      this.state.activeTab,
      this.state.selectedLanguageKey,
    );
    const selectedLanguageDefs = { ...this.state.selectedLanguageDefs };
    _unset(selectedLanguageDefs, path);
    this.setState({
      selectedLanguageDefs,
    });
  };

  getDropdownOptionsForValue = value =>
    value
      ? this.languageDropdownSearch.search(value)
      : this.state.languageDefinitions;

  changeEnv = env =>
    this.setState(
      {
        activeTab: env,
        activeCategory: null,
        selectedLanguageKey: null,
      },
      () => browserHistory.push(`/tools/translator/${env}`),
    );

  pushToEnv = async env => {
    const { selectedLanguageDefs, selectedLanguageKey } = this.state;
    await this.firebaseAPI.setLanguageAt(
      env.value,
      selectedLanguageKey,
      selectedLanguageDefs,
    );
  };

  pushToOptionsForEnv = () => {
    const { activeTab } = this.state;
    switch (activeTab) {
      case 'dev':
        return [TabDefinition.qa, TabDefinition.uat, TabDefinition.prod];
      case 'qa':
        return [TabDefinition.uat, TabDefinition.prod];
      case 'uat':
        return [TabDefinition.prod];
      default:
        return [];
    }
  };

  selectLanguage = async lang => {
    const activeTab = this.state.activeTab;
    const selectedLanguageDefs = await this.firebaseAPI.fetchOrgLanguage(
      activeTab,
      lang,
    );
    await this.setState(
      { selectedLanguageDefs, selectedLanguageKey: lang },
      () =>
        browserHistory.push(
          `/tools/translator/${this.props.params.env}/${lang}`,
        ),
    );
  };

  renderChild() {
    const {
      selectedLanguageDefs,
      selectedLanguageKey,
      activeCategory,
    } = this.state;
    const definitions =
      selectedLanguageDefs && selectedLanguageDefs[activeCategory];
    return selectedLanguageKey ? (
      <Editor
        category={activeCategory}
        definitions={definitions}
        firebase={this.firebaseAPI}
        languageKey={selectedLanguageKey}
        onAddDefinition={this.onAddDefinition}
        onSaveChanges={this.onAddDefinition}
        onDeleteDef={this.onDeleteDef}
      />
    ) : (
      <Dashboard />
    );
  }

  renderSidebar() {
    const { languages, selectedLanguageKey, selectedLanguageDefs } = this.state;
    return selectedLanguageKey ? (
      <EditorSidebar
        defs={selectedLanguageDefs}
        onSidebarCategoryClick={this.onSidebarCategoryClick}
        onBackClick={() =>
          this.setState({ selectedLanguageKey: null }, () =>
            browserHistory.push(`/tools/translator/${this.props.params.env}`),
          )
        }
        onCategoryAdd={this.onCategoryAdd}
      />
    ) : (
      <DashboardSidebar
        defs={this.getDropdownOptionsForValue()}
        onNewLanguageSelect={this.onNewLanguageSelect}
        onInputValueChange={this.getDropdownOptionsForValue}
      >
        <OrgLanguageList
          selectLanguage={this.selectLanguage}
          languages={languages}
          selected={selectedLanguageKey}
        />
      </DashboardSidebar>
    );
  }

  getTabsForPermissions = email => {
    if (isGrowEmployee(email)) {
      return [
        TabDefinition.dev,
        TabDefinition.qa,
        TabDefinition.uat,
        TabDefinition.prod,
      ];
    }
    return [TabDefinition.uat, TabDefinition.prod];
  };

  renderTabBar() {
    const { activeTab, selectedLanguageKey } = this.state;
    const { userEmail } = this.props;
    const options = this.pushToOptionsForEnv();
    const tabs = this.getTabsForPermissions(userEmail);
    return (
      <TabBar>
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            active={activeTab === tab.value}
            onClick={() => this.changeEnv(tab.value)}
          >
            {tab.display}
          </Tab>
        ))}
        {selectedLanguageKey &&
          options.length > 0 &&
          isGrowEmployee(userEmail) && (
            <Tab noStyle>
              <Dropdown
                onChange={this.pushToEnv}
                placeholder="Push to"
                items={options}
                itemToString={i => (i == null ? '' : i.display)}
              />
            </Tab>
          )}
      </TabBar>
    );
  }

  render() {
    const { languages } = this.state;
    return languages.length > 0 ? (
      <ViewPermission permission="EDIT_TRANSLATIONS">
        <Container>
          <ContentCard>
            {this.renderTabBar()}
            {this.renderSidebar()}
            {this.renderChild()}
          </ContentCard>
        </Container>
      </ViewPermission>
    ) : (
      <div>loading..</div>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.user.email,
  org: state.auth.organization.toLowerCase(),
  permissions: state.users.permissions,
});

export default AuthWrapper(connect(mapStateToProps)(Translator));
