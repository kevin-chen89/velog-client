import * as React from 'react';
import { render } from 'react-testing-library';
import PostHead, { PostHeadProps } from '../PostHead';
import { MemoryRouter } from 'react-router';

describe('PostHead', () => {
  const setup = (props: Partial<PostHeadProps> = {}) => {
    const initialProps: PostHeadProps = {
      title: 'title',
      tags: ['tagA', 'tagB'],
      username: 'velopert',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toString(),
      thumbnail:
        'https://images.velog.io/post-images/velopert/ac519a50-7732-11e9-bded-7fa91ac5b455/image.png',
      hideThumbnail: false,
    };
    const utils = render(
      <MemoryRouter>
        <PostHead {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders title', () => {
    const { getByText } = setup();
    getByText('title');
  });
  it('renders username', () => {
    const { getByText } = setup();
    getByText('velopert');
  });
  it('renders date', () => {
    const { getByText } = setup();
    getByText('약 5시간 전');
  });

  it('renders tags', () => {
    const { getByText } = setup();
    getByText('tagA');
    getByText('tagB');
  });

  it('renders thumbnail', () => {
    const { getByAltText } = setup();
    getByAltText('post-thumbnail');
  });

  it('hides thumbnail', () => {
    const { queryByAltText } = setup({
      hideThumbnail: true,
    });
    const thumbnail = queryByAltText('post-thumbnail');
    expect(thumbnail).toBeFalsy();
  });
});
