import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { push } from 'react-router-redux'

import {
  FirebaseAPI,
  formatLanguageDefinitions,
  filterLanguageDefinitions,
} from '../lib';
import AuthWrapper from '../../../auth/containers/AuthWrapper';
import { FadeInFast } from '../../../ui/transitions/index';
import { Card, Dropdown } from '../../../ui/components';
import Tab from '../components/Tab';
import TabBar from '../components/TabBar';
import Dashboard from './Dashboard';
import DashboardSidebar from '../components/DashboardSidebar';
import Editor from './Editor';
import EditorSidebar from '../components/EditorSidebar';
import OrgLanguageList from '../components/OrgLanguageList';
import ViewPermission from '../../../ui/components/Permissions/ViewPermission';

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
      () => this.props.dispatch(push(`/tools/translator/${env}`),
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
        return [
          { display: 'Production', value: 'prod' },
          { display: 'Staging', value: 'uat' },
        ];
      case 'uat':
        return [{ display: 'Production', value: 'prod' }];
      case 'prod':
        return [{ display: 'Staging', value: 'uat' }];
      default:
        return [
          { display: 'Production', value: 'prod' },
          { display: 'Staging', value: 'uat' },
          { display: 'Development', value: 'dev' },
        ];
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
        this.props.dispatch(push(
          `/tools/translator/${this.props.params.env}/${lang}`,
        )),
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
            this.props.dispatch(push(`/tools/translator/${this.props.params.env}`),
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

  renderTabBar() {
    const activeTab = this.state.activeTab;
    return (
      <TabBar>
        {[
          { id: 'dev', title: 'Development' },
          { id: 'uat', title: 'UAT / Staging' },
          { id: 'prod', title: 'Production' },
        ].map(
          tab =>
            tab.id === 'dev' ? (
              <Tab
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => this.changeEnv(tab.id)}
              >
                {tab.title}
              </Tab>
            ) : (
              <Tab
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => this.changeEnv(tab.id)}
              >
                {tab.title}
              </Tab>
            ),
        )}
        {this.state.selectedLanguageKey && (
          <Tab noStyle>
            <Dropdown
              onChange={this.pushToEnv}
              placeholder="Push to"
              items={this.pushToOptionsForEnv()}
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
      <Container>
        <ViewPermission permission="EDIT_TRANSLATIONS">
          <ContentCard>
            {this.renderTabBar()}
            {this.renderSidebar()}
            {this.renderChild()}
          </ContentCard>
        </ViewPermission>
      </Container>
    ) : (
      <div>loading..</div>
    );
  }
}

const mapStateToProps = state => ({
  org: state.auth.organization.toLowerCase(),
  permissions: state.users.permissions,
});

export default AuthWrapper(connect(mapStateToProps)(Translator));
