import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../../components/base/PageTemplate';
import HorizontalTab from '../../components/common/HorizontalTab';
import { useLocation } from 'react-router';
import qs from 'qs';
import DetailedTagList from '../../components/tags/DetailedTagList';

const { TabItem } = HorizontalTab;

export type TagsPageProps = {};

const TagsTemplate = styled(PageTemplate)`
  main {
    margin-top: 3rem;
  }
`;

function TagsPage(props: TagsPageProps) {
  const location = useLocation();
  const { sort = 'popular' } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <TagsTemplate>
      <main>
        <HorizontalTab activeTab={sort}>
          <TabItem to="/tags?sort=popular" name="popular" text="인기순" />
          <TabItem
            to="/tags?sort=alphabetical"
            name="alphabetical"
            text="이름순"
          />
        </HorizontalTab>
        <DetailedTagList />
      </main>
    </TagsTemplate>
  );
}

export default TagsPage;
