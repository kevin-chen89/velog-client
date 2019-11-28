import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Skeleton from '../common/Skeleton';
import SkeletonTexts from '../common/SkeletonTexts';

export type TagDetailProps = {
  thumbnail: string | null;
  name: string;
  description: string | null;
  count: number;
};

function TagDetail({ thumbnail, name, description, count }: TagDetailProps) {
  return (
    <Block>
      {thumbnail && (
        <img
          src={thumbnail}
          alt={`name ${thumbnail}`}
          className="tag-thumbnail"
        />
      )}
      <h1># {name}</h1>
      {description && <p>{description}</p>}
      <div className="count">총 {count}개의 포스트</div>
    </Block>
  );
}

export function TagDetailSkeleton() {
  return (
    <SkeletonBlock>
      <Skeleton className="tag-thumbnail" />
      <h1>
        <Skeleton width="6em" />
      </h1>
      <div className="lines">
        <div className="line">
          <SkeletonTexts wordLengths={[3, 5, 7, 5, 2, 3, 5, 4, 5]} useFlex />
        </div>
        <div className="line">
          <SkeletonTexts wordLengths={[4, 3, 6]} />
        </div>
      </div>
      <div className="count">
        <Skeleton width="6rem" />
      </div>
    </SkeletonBlock>
  );
}

const Block = styled.div`
  padding-bottom: 4rem;

  .tag-thumbnail {
    width: 12rem;
    height: 12rem;
    display: block;
    border-radius: 6rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.125);
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 3rem;
    margin: 0;
    line-height: 1.5;
    color: ${palette.gray8};
  }
  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: ${palette.gray7};
  }
  .count {
    margin-top: 1rem;
    color: ${palette.gray6};
    font-size: 1rem;
  }
`;

const SkeletonBlock = styled(Block)`
  h1 {
    height: 4.5rem;
    display: flex;
    align-items: center;
  }
  .lines {
    margin-top: 1rem;
    margin-bottom: 1rem;
    .line {
      height: 1.6875rem;
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
`;

export default TagDetail;
