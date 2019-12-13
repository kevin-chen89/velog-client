import React, { useState, useEffect } from 'react';
import { usePrevious } from 'react-use';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { LikeIcon, ShareIcon, ClipIcon } from '../../static/svg';
import { useSpring, animated, config } from 'react-spring';
import useBoolean from '../../lib/hooks/useBoolean';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';
import Sticky from '../common/Sticky';
import media from '../../lib/styles/media';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  ${media.medium} {
    display: none;
  }
`;
const Positioner = styled.div`
  position: absolute;
  left: -7rem;
`;
const PostLikeShareButtonsBlock = styled(Sticky)`
  width: 4rem;
  background: ${palette.gray0};
  border: 1px solid ${palette.gray1};
  border-radius: 2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleButton = styled(animated.div)<{ active?: string }>`
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid ${palette.gray5};
  border-radius: 1.5rem;
  color: ${palette.gray6};
  cursor: pointer;
  z-index: 5;
  svg {
    width: 24px;
    height: 24px;
    &.share {
      width: 20px;
      height: 20px;
    }
  }
  &:hover {
    color: ${palette.gray9};
    border-color: ${palette.gray9};
  }
  ${props =>
    props.active === 'true' &&
    css`
      background: ${palette.teal5};
      border-color: ${palette.teal5};
      color: white;
      &:hover {
        background: ${palette.teal4};
        border-color: ${palette.teal4};
        color: white;
      }
    `}
`;

const LikeCount = styled.div`
  margin-top: 0.5rem;
  color: ${palette.gray7};
  line-height: 1;
  font-size: 0.75rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const ShareButtons = styled.div`
  position: relative;
  width: 100%;
  z-index: 5;
  .positioner {
    position: absolute;
  }
`;

const ShareButton = styled(animated.div)`
  top: 0;
  left: 0;
  position: absolute;
  width: 48px;
  height: 48px;
`;

export interface PostLikeShareButtonsProps {
  onLikeToggle: () => any;
  onShareClick: (type: 'facebook' | 'twitter' | 'clipboard') => void;
  likes: number;
  liked: boolean;
  postId: string;
}

const PostLikeShareButtons: React.FC<PostLikeShareButtonsProps> = ({
  onLikeToggle,
  onShareClick,
  likes,
  liked,
  postId,
}) => {
  const [animateLike, setAnimateLike] = useState(false);
  const [prevLiked, setPrevLiked] = useState(liked);
  const [open, toggle] = useBoolean(false);
  const prevPostId = usePrevious(postId);

  useEffect(() => {
    setPrevLiked(liked);
    if (!prevLiked && liked && prevPostId === postId) {
      setAnimateLike(true);
    }
  }, [liked, postId, prevLiked, prevPostId]);

  const { x } = useSpring({
    from: { x: 0 },
    x: animateLike ? 1 : 0,
    immediate: !animateLike,
    config: {
      duration: 600,
    },
    onRest: () => setAnimateLike(false),
  });
  const { shareX } = useSpring({
    from: { shareX: 0 },
    shareX: open ? 1 : 0,
    config: config.gentle,
  });

  const onClickShareOutside = () => {
    if (!open) return;
    toggle();
  };
  return (
    <Wrapper>
      <Positioner>
        <PostLikeShareButtonsBlock top={112}>
          <CircleButton
            data-testid="like"
            onClick={onLikeToggle}
            active={liked ? 'true' : 'false'}
            style={{
              transform: x
                .interpolate({
                  range: [0, 0.25, 0.5, 0.6, 1],
                  output: [1, 1.25, 1, 1.25, 1],
                })
                .interpolate(x => `scale(${x})`),
            }}
          >
            <LikeIcon />
          </CircleButton>
          <LikeCount>{likes}</LikeCount>
          <ShareButtons>
            <div className="positioner">
              <ShareButton
                style={{
                  opacity: shareX,
                  transform: shareX
                    .interpolate({
                      range: [0, 1],
                      output: [0, 1],
                    })
                    .interpolate(
                      shareX =>
                        `translate(${shareX * 48}px, -${shareX * 52}px)`,
                    ),
                }}
              >
                <CircleButton onClick={() => onShareClick('facebook')}>
                  <FaFacebook />
                </CircleButton>
              </ShareButton>
              <ShareButton
                style={{
                  opacity: shareX,
                  transform: shareX
                    .interpolate({
                      range: [0, 1],
                      output: [0, 1],
                    })
                    .interpolate(shareX => `translate(${shareX * 72}px)`),
                }}
              >
                <CircleButton onClick={() => onShareClick('twitter')}>
                  <FaTwitter />
                </CircleButton>
              </ShareButton>
              <ShareButton
                style={{
                  opacity: shareX,
                  transform: shareX
                    .interpolate({
                      range: [0, 1],
                      output: [0, 1],
                    })
                    .interpolate(
                      shareX => `translate(${shareX * 48}px, ${shareX * 52}px)`,
                    ),
                }}
              >
                <CircleButton onClick={() => onShareClick('clipboard')}>
                  <ClipIcon />
                </CircleButton>
              </ShareButton>
            </div>
          </ShareButtons>
          <OutsideClickHandler onOutsideClick={onClickShareOutside}>
            <CircleButton onClick={toggle} style={{ position: 'relative' }}>
              <ShareIcon className="share" />
            </CircleButton>
          </OutsideClickHandler>
        </PostLikeShareButtonsBlock>
      </Positioner>
    </Wrapper>
  );
};

export default PostLikeShareButtons;
