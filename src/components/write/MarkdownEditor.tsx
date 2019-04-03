import * as React from 'react';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/dracula.css';
import CodeMirror from 'codemirror';
import TitleTextarea from './TitleTextarea';
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/display/placeholder');
import './atom-one-light.css';
import palette from '../../lib/styles/palette';
import Toolbar from './Toolbar';

export interface MarkdownEditorProps {}
type MarkdownEditorState = {
  shadow: boolean;
};

(window as any).CodeMirror = CodeMirror;
const MarkdownEditorBlock = styled.div`
  height: 100%;
  overflow-y: auto;
  .wrapper {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .CodeMirror {
    height: auto;
    font-size: 1.3125rem;
    line-height: 1.5;
    color: ${palette.gray8};
    .cm-header {
      line-height: 2;
      color: ${palette.gray9};
    }
    .cm-header-1 {
      font-size: 2.5rem;
    }
    .cm-header-2 {
      font-size: 2rem;
    }
    .cm-header-3 {
      font-size: 1.5rem;
    }
    .cm-header-4,
    .cm-header-5,
    .cm-header-6 {
      font-size: 1.3125rem;
    }
    .cm-strong,
    .cm-em {
      color: ${palette.gray9};
    }
    .CodeMirror-placeholder {
      color: ${palette.gray5};
      font-style: italic;
    }
  }
`;

const PaddingWrapper = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
`;
export default class MarkdownEditor extends React.Component<
  MarkdownEditorProps,
  MarkdownEditorState
> {
  block = React.createRef<HTMLDivElement>();
  editorElement = React.createRef<HTMLTextAreaElement>();
  toolbarTop = 0;
  state = {
    shadow: false,
  };

  initialize = () => {
    if (!this.editorElement.current) return;
    CodeMirror.fromTextArea(this.editorElement.current, {
      mode: 'markdown',
      theme: 'one-light',
      placeholder: '당신의 이야기를 적어보세요...',
      viewportMargin: Infinity,
      lineWrapping: true,
    });
  };

  handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { shadow } = this.state;
    const nextShadow = e.currentTarget.scrollTop > this.toolbarTop;
    if (shadow !== nextShadow) {
      this.setState({
        shadow: nextShadow,
      });
    }
  };
  componentDidMount() {
    this.initialize();
    if (this.block.current) {
      this.toolbarTop = this.block.current.getBoundingClientRect().top;
    }
  }

  public render() {
    const { shadow } = this.state;
    return (
      <MarkdownEditorBlock ref={this.block} onScroll={this.handleScroll}>
        <div className="wrapper">
          <PaddingWrapper>
            <TitleTextarea placeholder="제목을 입력하세요" />
          </PaddingWrapper>
          <Toolbar visible shadow={shadow} mode="MARKDOWN" />
          <PaddingWrapper>
            <textarea id="bla" ref={this.editorElement} />
          </PaddingWrapper>
        </div>
      </MarkdownEditorBlock>
    );
  }
}
