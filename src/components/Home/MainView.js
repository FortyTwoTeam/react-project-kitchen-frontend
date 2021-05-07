import ArticleList from '../ArticleList/ArticleList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import TabsNavigation from './Tabs/TabsNavigation/TabsNavigation';
import TabsItem from './Tabs/TabItem/TabsItem';

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

const MainView = (props) => {
  const clickHandler = (type) => {
    props.onTabClick(type, agent.Articles[type], agent.Articles[type]());
  };

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <TabsNavigation>
          <TabsItem
            name="Ваша лента"
            onTabClick={clickHandler}
            type="feed" 
            active={props.tab === 'feed' ? true : false}
          />
          <TabsItem
            name="Лента"
            onTabClick={clickHandler}
            type="all" 
            active={props.tab === 'all' ? true : false} 
          />
          <TabsItem 
            name={`#${props.tag}`}
            onTabClick={clickHandler}
            type="all"false
            active={props.tab ? false : true}
            hide = {!props.tag}
          />
        </TabsNavigation>

      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
