import * as React from 'react';
import { connect, batch } from 'react-redux';
import QuillEditor from '../../components/write/QuillEditor';
import { RootState } from '../../modules';
import {
  convertEditorMode,
  changeTitle,
  changeMarkdown,
  openPublish,
  setHtml,
  setTextBody,
  setDefaultDescription,
  setThumbnail,
} from '../../modules/write';
import TagInputContainer from './TagInputContainer';
import WriteFooter from '../../components/write/WriteFooter';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type QuillEditorContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = ({ write }: RootState) => ({
  mode: write.mode,
  title: write.title,
  html: write.html,
  textBody: write.textBody,
  thumbnail: write.thumbnail,
});
const mapDispatchToProps = {
  convertEditorMode,
  changeTitle,
  changeMarkdown,
  openPublish,
  setHtml,
  setTextBody,
  setDefaultDescription,
  setThumbnail,
};

const { useCallback, useEffect } = React;

const QuillEditorContainer: React.FC<QuillEditorContainerProps> = ({
  title,
  changeMarkdown,
  convertEditorMode,
  changeTitle,
  openPublish,
  html,
  setHtml,
  setTextBody,
  setDefaultDescription,
  textBody,
  thumbnail,
  setThumbnail,
}) => {
  const onConvertEditorMode = (markdown: string) => {
    batch(() => {
      changeMarkdown(markdown);
      convertEditorMode();
    });
  }; // after transition
  const onChangeTitle = (title: string) => changeTitle(title);
  const onChangeHtml = (html: string) => setHtml(html);
  const onChangeTextBody = (textBody: string) => setTextBody(textBody);

  const onPublish = useCallback(() => {
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';
    openPublish();
    setDefaultDescription(textBody.replace(/\n/g, '').slice(0, 150));
  }, [openPublish, setDefaultDescription, textBody]);

  const [upload, file] = useUpload();
  const [s3Upload, image] = useS3Upload();

  useEffect(() => {
    if (!file) return;
    s3Upload(file, {
      type: 'post',
    });
  }, [file, s3Upload]);

  useEffect(() => {
    if (!thumbnail && image) {
      setThumbnail(image);
    }
  }, [image, setThumbnail, thumbnail]);

  return (
    <QuillEditor
      title={title}
      onConvertEditorMode={onConvertEditorMode}
      onChangeTitle={onChangeTitle}
      initialHtml={html}
      tagInput={<TagInputContainer />}
      onChangeHtml={onChangeHtml}
      onChangeTextBody={onChangeTextBody}
      footer={<WriteFooter onPublish={onPublish} onTempSave={() => {}} />}
      onUpload={upload}
      lastUploadedImage={image}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(QuillEditorContainer);
